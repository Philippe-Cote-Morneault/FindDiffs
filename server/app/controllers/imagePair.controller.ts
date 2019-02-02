import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ImagePairService } from "../services/imagePair/imagePair.service";
import TYPES from "../types";
import { uploads } from "../utils/storage";
import { IController } from "./interfaces";

@injectable()
export class ImagePairController implements IController {

    public constructor(@inject(TYPES.IImagePairService) private imagePairService: ImagePairService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/", uploads.fields([
                {name: "originalImage", maxCount: 1},
                {name: "modifiedImage", maxCount: 1},
            ]),
            (req: Request, res: Response, next: NextFunction) => {
                res.send(this.imagePairService.post(req));
            });

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send(this.imagePairService.index());
        });

        router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
            res.send(this.imagePairService.single(req.params.id));
        });

        router.get("/:id/difference", (req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            res.sendFile(this.imagePairService.getDifference(req.params.id));
        });

        router.get("/:id/modified", (req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            res.sendFile(this.imagePairService.getModified(req.params.id));
        });

        router.get("/:id/original", (req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            res.sendFile(this.imagePairService.getOriginal(req.params.id));
        });

        return router;
    }
}
