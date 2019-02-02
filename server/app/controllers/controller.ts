import { Response } from "express";
import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

@injectable()
export abstract class Controller {
    private static readonly BAD_REQUEST: number = 400;

    protected handleError(res: Response , error: Error): void {
        error["status"] ? res.status(error["status"]) : res.status(Controller.BAD_REQUEST);
        const message: Message = {
            title: "Error",
            body: error.message,
        };
        res.json(message);
    }
}
