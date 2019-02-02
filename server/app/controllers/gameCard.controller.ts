import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameCardService } from "../services/gameCard/gameCard.service";
import TYPES from "../types";
import { IGameCardController } from "./interfaces";

@injectable()
export class GameCardController implements IGameCardController {

    public constructor(@inject(TYPES.IGameCardController) private gameCardService: GameCardService) {}

    public get router(): Router {
        const router: Router = Router();

        router.post("/", async(req: Request, res: Response, next: NextFunction) => {
                res.send(this.gameCardService.post(req));
            });

        router.get("/", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.gameCardService.index();
            res.send(response);
        });

        router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.gameCardService.single(req.params.id);
            res.send(response);
        });

        router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.gameCardService.delete(req.params.id);
            res.send(response);
        });

        return router;
    }
}
