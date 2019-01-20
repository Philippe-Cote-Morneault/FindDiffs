import { Request } from "express";
//import fs = require("fs");
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
//import { Bitmap } from "../model/Bitmap";

export class DifferenceController {

    public printError(error: string): string {
        const message: Message = {
            title: "Erreur",
            body: error,
        };

        return JSON.stringify(message);
    }

    public genDifference(req: Request): string {

        if (!req.body.name) {
            return this.printError("Le nom est manquant (name)");
        }

        if (!req.files["originalImage"][0]) {
            return this.printError("L'image originale est manquante (originalImage)");
        }

        if (!req.files["modifiedImage"][0]) {
            return this.printError("L'image modifié est manquante (modifiedImage)");
        }
        //TODO add verifications for images if the size and the format is ok

       // const bitmap: Bitmap = new Bitmap(new Buffer(fs.readFileSync(req.files["originalImage"].path)));
        //bitmap.toFile("test");

        return JSON.stringify({"message": "it works"});
    }
}
