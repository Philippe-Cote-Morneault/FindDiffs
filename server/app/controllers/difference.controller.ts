import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DifferenceService } from "../services/difference/difference.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { IDifferenceController } from "./interfaces";

@injectable()
export class DifferenceController extends Controller implements IDifferenceController {

    public constructor(@inject(TYPES.IDifferenceService) private differenceService: DifferenceService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.post("/free", async(req: Request, res: Response, next: NextFunction) => {
            try {
                res.send(await this.differenceService.postFree(req));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.post("/simple", async(req: Request, res: Response, next: NextFunction) => {
            try {
                res.send(await this.differenceService.postSimple(req));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
