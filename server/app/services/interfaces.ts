import { Request } from "express";

export interface IImagePairService {
    post(req: Request): string;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    getDifference(id: string): Promise<string>;
    getModified(id: string): Promise<string>;
    getOriginal(id: string): Promise<string>;
}
