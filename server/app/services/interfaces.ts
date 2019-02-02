import { Request } from "express";

export interface IImagePairService {
    post(req: Request): string;
    index(): string;
    single(id: string): string;
    getDifference(id: string): string;
    getModified(id: string): string;
    getOriginal(id: string): string;
}
