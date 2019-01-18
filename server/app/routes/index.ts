import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { DifferenceController } from "../controllers/differenceController";

export module Route {

    @injectable()
    export class Index {

        private diffrenceController: DifferenceController;
        public constructor() {
            this.diffrenceController = new DifferenceController();
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
