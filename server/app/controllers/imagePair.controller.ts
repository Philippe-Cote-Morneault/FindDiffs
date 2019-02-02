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

        router.get("/", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.imagePairService.index();
            res.send(response);
        });

        router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.imagePairService.single(req.params.id);
            res.send(response);
        });

        router.get("/:id/difference", async(req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            const filePath: string = await this.imagePairService.getDifference(req.params.id);
            res.sendFile(filePath);
        });

        router.get("/:id/modified", async(req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            const filePath: string = await this.imagePairService.getModified(req.params.id);
            res.sendFile(filePath);
        });

        router.get("/:id/original", async(req: Request, res: Response, next: NextFunction) => {
            // Get the path of the file and send it to the client
            const filePath: string = await this.imagePairService.getOriginal(req.params.id);
            res.sendFile(filePath);
        });

        return router;
    }
}
