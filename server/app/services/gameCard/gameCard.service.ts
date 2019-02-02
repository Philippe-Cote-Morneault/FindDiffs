import { Request } from "express";
import "reflect-metadata";
import { IGameCardService } from "../interfaces";
import { Service } from "../service";

export class GameCardService extends Service implements IGameCardService {

    public post(req: Request): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public index(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public single(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
