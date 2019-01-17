import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";
import { injectable, } from "inversify";
import { ControllerDifference } from "../controllers/controllerDifference";

export module Route {

    @injectable()
    export class Index {

        private controllerDifference: ControllerDifference;
        public constructor() {
            this.controllerDifference = new ControllerDifference();
        }

        public helloWorld(req: Request, res: Response, next: NextFunction): void {
            const message: Message = {
                title: "Hello",
                body: "World"
            };
            res.send(JSON.stringify(message));
        }
        public postDifference(req: Request, res: Response, next: NextFunction): void{
            res.send(this.controllerDifference.genDifference(req, res, next));
        }
    }
}
