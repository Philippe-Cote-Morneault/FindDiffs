import { NextFunction, Request, Response, Router } from "express";
import {inject, injectable} from "inversify";
import { UserService } from "../services/user/user.service";
import TYPES from "../types";
import { IUserController } from "./interfaces";

@injectable()
export class UserController implements IUserController {
    public constructor(@inject(TYPES.IUserService) private userService: UserService) {}

    public get router(): Router {
        const router: Router = Router();

        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.userService.index();
            res.send(response);
        });

        router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.userService.post(req);
            res.send(response);
        });
        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.userService.single(req.params.id);
            res.send(response);
        });

        router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const response: string = await this.userService.delete(req.params.id);
            res.send(response);
        });

        return router;
    }
}
