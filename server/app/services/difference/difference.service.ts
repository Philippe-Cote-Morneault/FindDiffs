import { Request } from "express";
import "reflect-metadata";
import { IDifferenceService } from "../interfaces";
import { Service } from "../service";

export class DifferenceService extends Service implements IDifferenceService {
    public postSimple(req: Request): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public postFree(req: Request): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
