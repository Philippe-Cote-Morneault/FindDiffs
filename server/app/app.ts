import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { DifferenceController } from "./controllers/difference.controller";
import { GameCardController } from "./controllers/gameCard.controller";
import { ImagePairController } from "./controllers/imagePair.controller";
import { SceneController } from "./controllers/scene.controller";
import { ScoreController } from "./controllers/score.controller";
import { IApplication } from "./interfaces";
import Types from "./types";
import { DbConnectionHandler } from "./utils/dbConnectionHandler";

@injectable()
export class Application implements IApplication {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(
        @inject(Types.IImagePairController) private imagePairController: ImagePairController,
        @inject(Types.IDifferenceController) private differenceController: DifferenceController,
        @inject(Types.ISceneController) private sceneController: SceneController,
        @inject(Types.ISceneController) private scoreController: ScoreController,
        @inject(Types.IGameCardController) private gameCardController: GameCardController) {
        this.app = express();
        this.config();
        this.bindRoutes();
        this.databaseConnection();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public bindRoutes(): void {
        this.app.use("/image-pair", this.imagePairController.router);
        this.app.use("/gamecard", this.scoreController.router);
        this.app.use("/gamecard", this.gameCardController.router);
        this.app.use("/difference", this.differenceController.router);
        this.app.use("/scene", this.sceneController.router);

        this.errorHandeling();
    }

    private databaseConnection(): void {
        // tslint:disable no-console
        const database: DbConnectionHandler = new DbConnectionHandler();
        database.connect(
            () => {
                console.log("Connected to database!");
            },
            (err: Error) => {
                console.log("Error with database");
                console.error(err);
            });
    }

    private errorHandeling(): void {
        // Error management
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
