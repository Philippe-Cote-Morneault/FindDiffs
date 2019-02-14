import { NextFunction, Request, Response, Router } from "express";
import {inject, injectable} from "inversify";
import { SceneService } from "../services/scene/scene.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { ISceneController } from "./interfaces";

@injectable()
export class SceneController extends Controller implements ISceneController {
    public constructor(@inject(TYPES.ISceneService) private sceneService: SceneService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.sceneService.post(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });
        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.sceneService.single(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.post("/:id/modified", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.sceneService.postModified(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id/modified", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.sceneService.singleModified(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
