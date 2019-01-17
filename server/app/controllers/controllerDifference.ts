import { Request } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";

export class ControllerDifference {
    
    private printError(error: string): string{
        const message: Message = {
            title: "Erreur",
            body: error
        };
        return JSON.stringify(message);
    }

    public genDifference(req: Request): string {   

        if(!req.body.name){
            return this.printError("Le nom est manquant (name)");
        }

        if(!req.body.originalImage){
            return this.printError("L'image originale est manquante (originalImage)");
        }

        if(!req.body.modifiedImage){
            return this.printError("L'image modifié est manquante (modifiedImage)");
        }

        return JSON.stringify({"message":"it works"});
    }
}
