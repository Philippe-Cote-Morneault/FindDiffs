import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { UsernameValidation } from "./routes/verifyUsername";
import { Route } from "./routes/index";

@injectable()
export class Routes {

    public constructor(
        @inject(Types.UsernameValidation)
        @inject(Types.Index)
         private usernameValidation: UsernameValidation,
         private index: Route.Index
         
         
         
        ) {}

    public get routes(): Router {
        const router: Router = Router();

        
        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.index.helloWorld(req, res, next));

        router.get("/verifyUser/:username?",
                   (req: Request, res: Response, next: NextFunction) => this.usernameValidation.verifyUsername(req, res, next));

        router.post("/differences",
                    (req: Request, res: Response, next: NextFunction) => this.index.postDifference(req, res, next));
        return router;
    }
}
