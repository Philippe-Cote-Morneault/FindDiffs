import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ScoreService } from "../services/score/score.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { IScoreController } from "./interfaces";

@injectable()
export class ScoreController extends Controller implements IScoreController {
    public constructor(@inject(TYPES.IScoreService) private scoreService: ScoreService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.post("/:id/", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.scoreService.post(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.put("/:id/", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.scoreService.update(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id/", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.scoreService.single(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
