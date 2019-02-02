import { Request } from "express";
import * as fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { Bitmap } from "../../model/bitmap/bitmap";
import { ImagePair, IImagePair } from "../../model/schemas/imagePair";
import { Storage } from "../../utils/storage";
import { IImagePairService } from "../interfaces";
import { BitmapDecoder } from "./bitmapDecoder";
import { BitmapEncoder } from "./bitmapEncoder";
import { DifferenceDetector } from "./differenceDetector";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

@injectable()
export class ImagePairService implements IImagePairService {

    public async index(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async single(id: string): Promise<string> {
        // Mongoose return data
        return ImagePair.findById(id)
            .then((doc: IImagePair) => {
                return JSON.stringify(doc); })
            .catch((error: Error) => {
                return JSON.stringify(this.printError(error.message));
            });
    }

    public async getDifference(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async getModified(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async getOriginal(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public printError(error: string): string {
        const message: Message = {
            title: "Error",
            body: error,
        };

        return JSON.stringify(message);
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

    public post(req: Request): string {
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
            file_id: guid,
            name: req.body.name,
            creation_date: new Date(),
            differences_count: new DifferenceDetector(differences).countDifferences(),
        });
        difference.save();

        return JSON.stringify(difference);
    }
}
