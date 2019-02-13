import { Request } from "express";
import "reflect-metadata";
import { ISceneService } from "../interfaces";
import { Service } from "../service";

export class SceneService extends Service implements ISceneService {
    public async post(req: Request): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async postModified(req: Request): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async single(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async singleModified(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
