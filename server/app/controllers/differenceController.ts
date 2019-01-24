import { Request } from "express";
import "reflect-metadata";
import { Difference } from "../../../common/communication/difference";
import { Message } from "../../../common/communication/message";
import { InvalidFormatException } from "../../../common/errors/invalidFormatException";
import { Bitmap } from "../model/bitmap/bitmap";
import { BitmapDecoder } from "../services/differenceGenerator/bitmapDecoder";
import { BitmapEncoder } from "../services/differenceGenerator/bitmapEncoder";
import { DifferenceImageGenerator } from "../services/differenceGenerator/differenceImageGenerator";
import { Storage } from "../utils/storage";

export class DifferenceController {

    public printError(error: string): string {
        const message: Message = {
            title: "Erreur",
            body: error,
        };

        return JSON.stringify(message);
    }

    private validate(req: Request): void {
        if (!req.body.name) {
            throw new InvalidFormatException("The field name is missing");
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
    }

    public genDifference(req: Request): string {

        let originalImage: Bitmap;
        let modifiedImage: Bitmap;
        try {
            this.validate(req);

            // Read file and extract its bytes.
            originalImage = BitmapDecoder.FromArrayBuffer(req.files["originalImage"][0].buffer);
            modifiedImage = BitmapDecoder.FromArrayBuffer(req.files["modifiedImage"][0].buffer);

        } catch (e) {
            return this.printError(e.Message);
        }

        // We call the difference image generator and save the result with the help of multer.
        const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator(originalImage, modifiedImage);
        const differences: Bitmap = differenceImageGenerator.generateImage();

        const guid: string = Storage.saveBuffer(BitmapEncoder.encodeBitmap(differences));
        const difference: Difference = {
            url: "http://localhost:3000/difference/" + guid,
            guid: guid,
        };

        return JSON.stringify(difference);
    }
}
