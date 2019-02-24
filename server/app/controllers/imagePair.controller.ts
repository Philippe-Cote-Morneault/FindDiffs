import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ImagePairService } from "../services/imagePair/imagePair.service";
import TYPES from "../types";
import { uploads } from "../utils/storage/storage";
import { Controller } from "./controller";
import { IImagePairController } from "./interfaces";

@injectable()
export class ImagePairController extends Controller implements IImagePairController {

    public constructor(@inject(TYPES.IImagePairService) private imagePairService: ImagePairService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/", uploads.fields([
                {name: "originalImage", maxCount: 1},
                {name: "modifiedImage", maxCount: 1},
            ]),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const response: string = await this.imagePairService.post(req);
                    res.send(response);
                } catch (err) {
                    this.handleError(res, err);
                }
            });

        router.get("/", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.imagePairService.index();
            res.send(response);
        });

        router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.imagePairService.single(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id/difference", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const file: ArrayBuffer = await this.imagePairService.getDifference(req.params.id);
                res.set("Content-Type", "image/bmp");
                res.send(Buffer.from(file));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id/modified", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const file: ArrayBuffer = await this.imagePairService.getModified(req.params.id);
                res.set("Content-Type", "image/bmp");
                res.send(Buffer.from(file));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.get("/:id/original", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const file: ArrayBuffer = await this.imagePairService.getOriginal(req.params.id);
                res.set("Content-Type", "image/bmp");
                res.send(Buffer.from(file));
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
