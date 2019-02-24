import { Request } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { Bitmap } from "../../model/bitmap/bitmap";
import { ImagePair, IImagePair } from "../../model/schemas/imagePair";
import { _e, R } from "../../strings";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { Storage } from "../../utils/storage/storage";
import { IImagePairService } from "../interfaces";
import { Service } from "../service";
import { Difference } from "./difference";

@injectable()
export class ImagePairService extends Service implements IImagePairService {

    public async index(): Promise<string> {
        return ImagePair.find({})
            .then((docs: IImagePair[]) => {
                return JSON.stringify(docs);
            }).catch((error: Error) => {
                throw new InvalidFormatException(error.message);
            });
    }

    public async single(id: string): Promise<string> {
        return ImagePair.findById(id)
            .then((doc: IImagePair) => {
                if (!doc) {
                    throw new NotFoundException(R.ERROR_UNKNOWN_ID);
                }

                return JSON.stringify(doc); })
            .catch((error: Error) => {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            });
    }

    public async getDifference(id: string): Promise<ArrayBuffer> {
        return this.returnFile(id, "file_difference_id");
    }

    public async getDifferenceJSON(id: string): Promise<string> {
        const buffer: ArrayBuffer = await this.returnFile(id, "file_difference_json_id");

        return Buffer.from(buffer).toString();
    }

    public async getModified(id: string): Promise<ArrayBuffer> {
        return this.returnFile(id, "file_modified_id");
    }

    public async getOriginal(id: string): Promise<ArrayBuffer> {
        return this.returnFile(id, "file_original_id");
    }

    private async returnFile(id: string, fieldName: string): Promise<ArrayBuffer> {
        return ImagePair.findById(id).select(`+${fieldName}`)
        .then(async (doc: IImagePair) => {
            const fileId: string = doc.get(fieldName);

            return Storage.openBuffer(fileId);
        }).catch((error: Error) => {
            if (error.name === "FileNotFoundException") {
                throw error;
            } else {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }
        });
    }

    private validate(req: Request): void {
        if (!req.body.name) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.NAME_]));
        }

        if (!req.files) {
            throw new InvalidFormatException(R.ERROR_MISSING_FILES);
        }

        if (!req.files[R.ORIGINAL_IMAGE_FIELD] || req.files[R.ORIGINAL_IMAGE_FIELD].length < 1) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.ORIGINAL_IMAGE_]));
        }

        if (!req.files[R.MODIFIED_IMAGE_FIELD] || req.files[R.MODIFIED_IMAGE_FIELD].length < 1) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.MODIFIED_IMAGE_]));
        }

        if (!req.files[R.ORIGINAL_IMAGE_FIELD][0].originalname) {
            throw new InvalidFormatException(_e(R.ERROR_INVALID_FILE, [R.ORIGINAL_IMAGE]));
        }

        if (!req.files[R.MODIFIED_IMAGE_FIELD][0].originalname) {
            throw new InvalidFormatException(_e(R.ERROR_INVALID_FILE, [R.MODIFIED_IMAGE]));
        }
    }

    public async post(req: Request): Promise<string> {
        this.validate(req);
        const originalImage: Bitmap = BitmapDecoder.FromArrayBuffer(req.files[R.ORIGINAL_IMAGE_FIELD][0].buffer.buffer);
        const modifiedImage: Bitmap = BitmapDecoder.FromArrayBuffer(req.files[R.MODIFIED_IMAGE_FIELD][0].buffer.buffer);

        const originalImageId: string = await Storage.saveBuffer(req.files[R.ORIGINAL_IMAGE_FIELD][0].buffer.buffer);
        const modifiedImageId: string = await Storage.saveBuffer(req.files[R.MODIFIED_IMAGE_FIELD][0].buffer.buffer);

        const difference: Difference = new Difference(originalImage, modifiedImage);

        const imagePair: IImagePair = new ImagePair({
            file_difference_id: await difference.saveStorage(),
            file_modified_id: modifiedImageId,
            file_original_id: originalImageId,
            name: req.body.name,
            creation_date: new Date(),
            differences_count: difference.countDifferences(),
        });
        await imagePair.save();

        return JSON.stringify(imagePair);
    }
}
