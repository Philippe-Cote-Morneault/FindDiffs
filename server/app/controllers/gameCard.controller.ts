import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameCardService } from "../services/gameCard/gameCard.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { IGameCardController } from "./interfaces";

@injectable()
export class GameCardController extends Controller implements IGameCardController {

    public constructor(@inject(TYPES.IGameCardService) private gameCardService: GameCardService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.post("/", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.gameCardService.post(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.gameCardService.index();
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.gameCardService.single(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.put("/:id", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.gameCardService.update(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.gameCardService.delete(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
