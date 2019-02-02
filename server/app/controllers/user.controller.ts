import { NextFunction, Request, Response, Router } from "express";
import {inject, injectable} from "inversify";
import { UserService } from "../services/user/user.service";
import TYPES from "../types";
import { Controller } from "./controller";
import { IUserController } from "./interfaces";

@injectable()
export class UserController extends Controller implements IUserController {
    public constructor(@inject(TYPES.IUserService) private userService: UserService) { super(); }

    public get router(): Router {
        const router: Router = Router();

        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.userService.index();
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.userService.post(req);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });
        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.userService.single(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response: string = await this.userService.delete(req.params.id);
                res.send(response);
            } catch (err) {
                this.handleError(res, err);
            }
        });

        return router;
    }
}
