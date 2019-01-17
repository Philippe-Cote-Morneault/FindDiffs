import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";

export class ControllerDifference {
    public genDifference(req: Request, res: Response, next: NextFunction): string {   
        console.log(req.body);
        if(!req.body.name){
            const message: Message = {
                title: "Erreur",
                body: "Le nom est manquant"
            };
            return JSON.stringify(message);
        }
        if(!req.body.originalImage){
            const message: Message = {
                title: "Erreur",
                body: "L'image originale est manquante"
            };
            return JSON.stringify(message);
        }
        return JSON.stringify({"test":"test"});
    }
}
