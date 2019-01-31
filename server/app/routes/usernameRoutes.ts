import { Request, Response } from "express";
import { injectable, } from "inversify";
import "reflect-metadata";
import { UsernameHandler } from "../services/usernameHandler/usernameHandler.service";

@injectable()
export class UsernameValidation {
    private usernameHandler: UsernameHandler;

    public constructor() {
        this.usernameHandler = new UsernameHandler();
    }

    public verifyUsername(req: Request, res: Response): void {
        res.send(this.usernameHandler.verifyUsername(req, res));
    }

    public deleteUsername(req: Request, res: Response): void {
        res.send(this.usernameHandler.deleteUsername(req));
    }
}
