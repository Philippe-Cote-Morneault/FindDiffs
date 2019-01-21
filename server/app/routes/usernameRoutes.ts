import { NextFunction, Request, Response } from "express";
import { injectable, } from "inversify";
import "reflect-metadata";
import { UsernameController } from "../controllers/usernameController";

@injectable()
export class UsernameValidation {
    private usernameController: UsernameController;
    public constructor() {
        this.usernameController = new UsernameController();
    }
    public verifyUsername(req: Request, res: Response, next: NextFunction): void {
        res.send(this.usernameController.verifyUsername(req, res, next));
    }
    public deleteUsername(req: Request, res: Response, next: NextFunction): void {
        res.send(this.usernameController.deleteUsername(req, res, next));
    }
}
