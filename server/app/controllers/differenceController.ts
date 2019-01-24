import { Request } from "express";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { InvalidFormatException } from "../../../common/errors/invalidFormatException";
import { Bitmap } from "../model/bitmap/bitmap";
import { BitmapDecoder } from "../services/differenceGenerator/bitmapDecoder";
import { DifferenceImageGenerator } from "../services/differenceGenerator/differenceImageGenerator";

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
            throw new InvalidFormatException("Le nom est manquant (name)");
        }

        if (!req.files) {
            throw new InvalidFormatException("Des fichiers doivent être téléversés, aucun fichier n'a été téléversé!");
        }

        if (!req.files["originalImage"] || req.files["originalImage"].length < 1) {
            throw new InvalidFormatException("L'image originale est manquante (originalImage)");
        }

        if (!req.files["modifiedImage"] || req.files["modifiedImage"].length < 1) {
            throw new InvalidFormatException("L'image modifié est manquante (modifiedImage)");
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

        return JSON.stringify({"message": "it works"});
    }
}
