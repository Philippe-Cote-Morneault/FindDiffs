import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import multer = require("multer");
import { Route } from "./routes/index";
import { UsernameValidation } from "./routes/verifyUsername";
import Types from "./types";
@injectable()
export class Routes {

    /* tslint:disable typedef */
    private static upload = multer({
        dest: "uploads/", // this saves your file into a directory called "uploads"
    });

    public constructor(
        @inject(Types.UsernameValidation)private usernameValidation: UsernameValidation,
        @inject(Types.Index)private index: Route.Index,
        ) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.index.helloWorld(req, res, next));

        router.get("/verifyUser/:username?",
                   (req: Request, res: Response, next: NextFunction) => this.usernameValidation.verifyUsername(req, res, next));

        router.post("/image-pair/", Routes.upload.fields([
            {name: "originalImage", maxCount: 1},
            {name: "modifiedImage", maxCount: 1},
        ]),         (req: Request, res: Response, next: NextFunction) => this.index.postDifference(req, res, next));

        return router;
    }
}
