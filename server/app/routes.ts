import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Route } from "./routes/index";
import { UsernameValidation } from "./routes/usernameRoutes";
import Types from "./types";

@injectable()
export class Routes {

    public constructor(
        @inject(Types.UsernameValidation)private usernameValidation: UsernameValidation,
        @inject(Types.Index)private index: Route.Index,
        ) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.index.helloWorld(req, res, next));

        router.get("/verifyUser/:username?",
                   (req: Request, res: Response) => this.usernameValidation.verifyUsername(req, res));

        router.post("/differences",
                    (req: Request, res: Response, next: NextFunction) => this.index.postDifference(req, res, next));

        router.get("/verifyUser/deleteUser/:username?", (req: Request, res: Response) =>
        this.usernameValidation.deleteUsername(req, res));

        return router;
    }
}
