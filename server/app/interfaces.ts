import { Application, Router } from "express";

export interface ApplicationInterface {
    app: Application;
    bindRoutes(): void;
}

export interface ServerInterface {
    init(): void;
}
