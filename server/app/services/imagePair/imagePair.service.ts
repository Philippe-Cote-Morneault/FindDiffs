import { Request } from "express";
import * as fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { FileNotFoundException } from "../../../../common/errors/fileNotFoundException";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { Bitmap } from "../../model/bitmap/bitmap";
import { ImagePair, IImagePair } from "../../model/schemas/imagePair";
import { _e, R } from "../../strings";
import { Storage } from "../../utils/storage";
import { IImagePairService } from "../interfaces";
import { Service } from "../service";
import { BitmapDecoder } from "./bitmapDecoder";
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
                    throw new NotFoundException(R.ERROR_UNKOWN_ID);
                }

                return JSON.stringify(doc); })
            .catch((error: Error) => {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            });
    }

    public async getDifference(id: string): Promise<string> {
        return this.returnFile(id, "file_difference_id");
    }

    public async getModified(id: string): Promise<string> {
        return this.returnFile(id, "file_modified_id");
    }

    public async getOriginal(id: string): Promise<string> {
        return this.returnFile(id, "file_original_id");
    }

    private async returnFile(id: string, fieldName: string): Promise<string> {
        return ImagePair.findById(id).select(`+${fieldName}`)
        .then((doc: IImagePair) => {
            const fileId: string = doc.get(fieldName);
            if (Storage.exists(fileId)) {
                return Storage.getFullPath(fileId);
            } else {
                throw new FileNotFoundException(fileId);
            }
        }).catch((error: Error) => {
            if (error.name === "FileNotFoundException") {
                throw error;
            } else {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
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

        if (!req.files["originalImage"] || req.files["originalImage"].length < 1) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.ORIGINAL_IMAGE_]));
        }

        if (!req.files["modifiedImage"] || req.files["modifiedImage"].length < 1) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.MODIFIED_IMAGE_]));
        }

        if (!req.files["originalImage"][0].path) {
            throw new InvalidFormatException(_e(R.ERROR_INVALID_FILE, [R.ORIGINAL_IMAGE]));
        }

        if (!req.files["modifiedImage"][0].path) {
            throw new InvalidFormatException(_e(R.ERROR_INVALID_FILE, [R.MODIFIED_IMAGE]));
        }
    }

    public async post(req: Request): Promise<string> {
        let originalImage: Bitmap;
        let modifiedImage: Bitmap;

        this.validate(req);

        originalImage = BitmapDecoder.FromArrayBuffer(
            fs.readFileSync(req.files["originalImage"][0].path).buffer,
        );
        modifiedImage = BitmapDecoder.FromArrayBuffer(
            fs.readFileSync(req.files["modifiedImage"][0].path).buffer,
        );

        const difference: Difference = new Difference(originalImage, modifiedImage);

        const imagePair: IImagePair = new ImagePair({
            file_difference_id: difference.saveStorage(),
            file_modified_id: req.files["modifiedImage"][0].filename,
            file_original_id: req.files["originalImage"][0].filename,
            name: req.body.name,
            creation_date: new Date(),
            differences_count: difference.countDifferences(),
        });
        await imagePair.save();

        return JSON.stringify(imagePair);
    }
}
