import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { ImagePairController } from "../controllers/imagePairController";

export module Route {

    @injectable()
    export class Index {

        private diffrenceController: ImagePairController;
        public constructor() {
            this.diffrenceController = new ImagePairController();
        }

        public helloWorld(req: Request, res: Response, next: NextFunction): void {
            const message: Message = {
                title: "Hello",
                body: "World",
            };
            res.send(JSON.stringify(message));
        }
        public postDifference(req: Request, res: Response, next: NextFunction): void {
            res.send(this.diffrenceController.genDifference(req));
        }
    }
}
