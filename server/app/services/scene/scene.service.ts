import { Request } from "express";
import "reflect-metadata";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { IScene, Scene} from "../../model/schemas/scene";
import { _e, R } from "../../strings";
import { EnumUtils } from "../../utils/enumUtils";
import { ISceneService } from "../interfaces";
import { Service } from "../service";
import { SceneDifferenceGenerator } from "./differenceGeneration/sceneDifferenceGenerator";
import { Grid } from "./grid";
import { SceneGenerator } from "./sceneGenerator";

export class SceneService extends Service implements ISceneService {
    private readonly MIN_OBJECT: number = 10;
    private readonly MAX_OBJECT: number = 200;

    private validatePost(req: Request): void {
        if (!req.body.object_type) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.OBJECT_TYPE_]));
        }

        if (!EnumUtils.isStringInEnum(req.body.object_type, ObjectType)) {
            throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [req.body.object_type]));
        }

        if (isNaN(req.body.object_qty)) {
            throw new InvalidFormatException(_e(R.ERROR_N_A_N, [R.OBJECT_QTY_]));
        }

        if (Number(req.body.object_qty) > this.MAX_OBJECT ||
            Number(req.body.object_qty) < this.MIN_OBJECT) {

            throw new InvalidFormatException(R.ERROR_OBJECTS_QTY);
        }
    }

    public async post(req: Request): Promise<string> {
        this.validatePost(req);
        const sceneGenerator: SceneGenerator = new SceneGenerator(req.body.object_qty);
        const scene: ICommonScene = sceneGenerator.generateScene();

        const sceneSchema: IScene = new Scene({
            scene: scene,
            grid: sceneGenerator.getGrid(),
            creation_date: new Date(),
        });
        await sceneSchema.save();
        scene.id = sceneSchema.id;

        return JSON.stringify(scene);
    }

    private validatePostModified(req: Request): void {
        if (!req.body.add && !req.body.delete && !req.body.color) {
            throw new InvalidFormatException(R.ERROR_NO_MODIFICATION);
        }
    }

    public async postModified(req: Request): Promise<string> {
        this.validatePostModified(req);

        return Scene.findById(req.params.id).then(async(doc: IScene) => {
            const grid: Grid = Grid.prototype;
            Object.assign(grid, doc.grid);

            const scene: ICommonScene = doc.scene as ICommonScene;
            scene.id = doc.id;

            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(
                scene,
                grid,
            );

            const sceneModifications: ICommonSceneModifications = differenceGenerator.generateModifiedScene(
                req.body.add,
                req.body.delete,
                req.body.color,
            );
            doc.modifications = sceneModifications;
            await doc.save();

            return JSON.stringify(sceneModifications);
        }).catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    public async single(id: string): Promise<string> {
        return Scene.findById(id).then(async(doc: IScene) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }
            doc.scene.id = doc.id;

            return JSON.stringify(doc.scene);
        })
        .catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    public async singleModified(id: string): Promise<string> {
        return Scene.findById(id).then(async(doc: IScene) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }

            return JSON.stringify(doc.modifications);
        })
        .catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });    }
}
