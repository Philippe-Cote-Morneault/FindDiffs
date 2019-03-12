import { Request } from "express";

export interface IImagePairService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    getDifference(id: string): Promise<ArrayBuffer>;
    getDifferenceJSON(id: string): Promise<string>;
    getModified(id: string): Promise<ArrayBuffer>;
    getOriginal(id: string): Promise<ArrayBuffer>;
}

export interface IUserService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    delete(id: string): Promise<string>;
}

export interface ISceneService {
    post(req: Request): Promise<string>;
    postModified(req: Request): Promise<string>;
    postThumbnail(req: Request): Promise<string>;
    single(id: string): Promise<string>;
    singleModified(id: string): Promise<string>;
    getThumbnail(id: string): Promise<ArrayBuffer>;
}

export interface IGameCardService {
    post(req: Request): Promise<string>;
    index(): Promise<string>;
    single(id: string): Promise<string>;
    delete(id: string): Promise<string>;
    update(req: Request): Promise<string>;
}

export interface IDifferenceService {
    postSimple(req: Request): Promise<string>;
    postFree(req: Request): Promise<string>;
}
