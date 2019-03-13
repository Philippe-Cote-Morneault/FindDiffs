import { NextFunction, Request, Response, Router } from "express";
import {inject, injectable} from "inversify";
import { SceneService } from "../services/scene/scene.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { ISceneController } from "./interfaces";
import { uploads } from "../utils/storage/storage";

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

        router.post("/:id/thumbnail", uploads.single("thumbnail"), async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req.file);
                const response: string = await this.sceneService.postThumbnail(req);
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

        router.get("/:id/thumbnail", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const file: ArrayBuffer = await this.sceneService.getThumbnail(req.params.id);
                res.set("Content-Type", "image/png");
                res.send(Buffer.from(file));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
