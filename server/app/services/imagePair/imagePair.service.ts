import { Request } from "express";
import * as fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { FileNotFoundException } from "../../../../common/errors/fileNotFoundException";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { Bitmap } from "../../model/bitmap/bitmap";
import { ImagePair, IImagePair } from "../../model/schemas/imagePair";
import { Storage } from "../../utils/storage";
import { IImagePairService } from "../interfaces";
import { Service } from "../service";
import { BitmapDecoder } from "./bitmapDecoder";
import { BitmapEncoder } from "./bitmapEncoder";
import { DifferenceDetector } from "./differenceDetector";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

@injectable()
export class ImagePairService extends Service implements IImagePairService {

    public async index(): Promise<string> {
        return ImagePair.find({})
            .then((docs: IImagePair[]) => {
                return JSON.stringify(docs);
            }).catch((error: Error) => {
                // TODO Catch exception and rethrow a diffrent error code
                return JSON.stringify(this.printError(error.message));
            });
    }

    public async single(id: string): Promise<string> {
        return ImagePair.findById(id)
            .then((doc: IImagePair) => {
                return JSON.stringify(doc); })
            .catch((error: Error) => {
                // TODO Catch exception and rethrow a diffrent error code
                return JSON.stringify(this.printError(error.message));
            });
    }

    public async getDifference(id: string): Promise<string> {
        return ImagePair.findById(id).select("+file_difference_id")
            .then((doc: IImagePair) => {
                const fileId: string = doc.get("file_difference_id");
                if (Storage.exists(fileId)) {
                    return Storage.getFullPath(fileId);
                } else {
                    throw new FileNotFoundException(fileId);
                }
            });
    }

    public async getModified(id: string): Promise<string> {
        return ImagePair.findById(id).select("+file_modified_id")
            .then((doc: IImagePair) => {
                const fileId: string = doc.get("file_modified_id");
                if (Storage.exists(fileId)) {
                    return Storage.getFullPath(fileId);
                } else {
                    throw new FileNotFoundException(fileId);
                }
            });
    }

    public async getOriginal(id: string): Promise<string> {
        return ImagePair.findById(id).select("+file_original_id")
            .then((doc: IImagePair) => {
                const fileId: string = doc.get("file_original_id");
                if (Storage.exists(fileId)) {
                    return Storage.getFullPath(fileId);
                } else {
                    throw new FileNotFoundException(fileId);
                }
            });
    }

    private validate(req: Request): void {
        if (!req.body.name) {
            throw new InvalidFormatException("The field name is missing.");
        }

        if (!req.files) {
            throw new InvalidFormatException("Files needs to be uploaded, no files were uploaded.");
        }

        if (!req.files["originalImage"] || req.files["originalImage"].length < 1) {
            throw new InvalidFormatException("Original image is missing.");
        }

        if (!req.files["modifiedImage"] || req.files["modifiedImage"].length < 1) {
            throw new InvalidFormatException("Modified image is missing.");
        }

        if (!req.files["originalImage"][0].path) {
            throw new InvalidFormatException("Original image is not a file.");
        }

        if (!req.files["modifiedImage"][0].path) {
            throw new InvalidFormatException("Modified image is not a file.");
        }
    }

    public async post(req: Request): Promise<string> {
        let originalImage: Bitmap;
        let modifiedImage: Bitmap;
        try {
            this.validate(req);
            // Read file and extract its bytes.
            originalImage = BitmapDecoder.FromArrayBuffer(
                fs.readFileSync(req.files["originalImage"][0].path).buffer,
            );
            modifiedImage = BitmapDecoder.FromArrayBuffer(
                fs.readFileSync(req.files["modifiedImage"][0].path).buffer,
            );
        } catch (e) {
            return this.printError(e.message);
        }
        // We call the difference image generator and save the result with the help of multer.
        const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator(originalImage, modifiedImage);
        const differences: Bitmap = differenceImageGenerator.generateImage();

        const guid: string = Storage.saveBuffer(BitmapEncoder.encodeBitmap(differences));
        const difference: IImagePair = new ImagePair({
            file_difference_id: guid,
            file_modified_id: req.files["modifiedImage"][0].filename,
            file_original_id: req.files["originalImage"][0].filename,
            name: req.body.name,
            creation_date: new Date(),
            differences_count: new DifferenceDetector(differences).countDifferences(),
        });
        await difference.save();

        return JSON.stringify(difference);
    }
}
