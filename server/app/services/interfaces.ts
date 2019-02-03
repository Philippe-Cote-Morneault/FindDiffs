import { Request } from "express";

export interface IImagePairService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    getDifference(id: string): Promise<string>;
    getModified(id: string): Promise<string>;
    getOriginal(id: string): Promise<string>;
}

export interface IUserService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    delete(id: string): Promise<string>;
}

export interface IGameCardService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    delete(id: string): Promise<string>;
    update(req: Request): Promise<string>;
}
