import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { Route } from "./routes/index";
import { UsernameValidation } from "./routes/usernameRoutes";
import Types from "./types";
@injectable()
export class Routes {

    /* tslint:disable typedef */
    //TODO ask
    private static upload = multer({
        dest: "uploads/",
    });

    public constructor(
        @inject(Types.UsernameValidation)private usernameValidation: UsernameValidation,
        @inject(Types.Index)private index: Route.Index,
        ) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.index.helloWorld(req, res, next));

        router.get("/user/:username?",
                   (req: Request, res: Response) => this.usernameValidation.verifyUsername(req, res));

        router.post("/image-pair/", Routes.upload.fields([
            {name: "originalImage", maxCount: 1},
            {name: "modifiedImage", maxCount: 1},
        ]),         (req: Request, res: Response, next: NextFunction) => this.index.postDifference(req, res, next));

        router.get("/user/deletion/:username?", (req: Request, res: Response) =>
        this.usernameValidation.deleteUsername(req, res));

        return router;
    }
}
