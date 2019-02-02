import { Application } from "express";

export interface IApplication {
    app: Application;
    bindRoutes(): void;
}

export interface IServer {
    init(): void;
}
