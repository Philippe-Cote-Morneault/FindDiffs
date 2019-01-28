import { Request, Response } from "express";
import { injectable, } from "inversify";
import "reflect-metadata";
import { UsernameSocket } from "../services/socket/usernameSocket.service";

@injectable()
export class UsernameValidation {
    private usernameSocket: UsernameSocket;
    public constructor() {
        this.usernameSocket = new UsernameSocket();
    }
    public verifyUsername(req: Request, res: Response): void {
        res.send(this.usernameSocket.verifyUsername(req, res));
    }
    public deleteUsername(req: Request, res: Response): void {
        res.send(this.usernameSocket.deleteUsername(req));
    }
}
