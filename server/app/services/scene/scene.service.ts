import { Request } from "express";
import "reflect-metadata";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { IScene, Scene} from "../../model/schemas/scene";
import { _e, R } from "../../strings";
import { EnumUtils } from "../../utils/enumUtils";
import { Storage } from "../../utils/storage/storage";
import { ISceneService } from "../interfaces";
import { Service } from "../service";
import { SceneDifferenceGenerator } from "./differenceGeneration/sceneDifferenceGenerator";
import { Grid } from "./grid";
import { SceneGenerator } from "./sceneGenerator";

export class SceneService extends Service implements ISceneService {
    private static readonly MIN_OBJECT: number = 10;
    private static readonly MAX_OBJECT: number = 200;

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

        if (Number(req.body.object_qty) > SceneService.MAX_OBJECT ||
            Number(req.body.object_qty) < SceneService.MIN_OBJECT) {

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

    public async postThumbnail(req: Request): Promise<string> {
        console.log("inPostThumbnail");
        return Scene.findById(req.params.id).then(async(doc: IScene) => {
            console.log(req.file.buffer.buffer);
            const thumbnailId: string = await Storage.saveBuffer(req.file.buffer.buffer);
            doc.update({ $set: { file_thumbnail_id: thumbnailId }});
            doc.url_thumbnail = thumbnailId;
            await doc.save();
            console.log(doc);

            return thumbnailId;
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
        });
    }

    public async getThumbnail(id: string): Promise<ArrayBuffer> {
        return this.returnFile(id, "file_thumbnail_id");
    }

    private async returnFile(id: string, fieldName: string): Promise<ArrayBuffer> {
        return Scene.findById(id).select(`+${fieldName}`)
        .then(async (doc: IScene) => {
            const fileId: string = doc.get(fieldName);

            return Storage.openBuffer(fileId);
        }).catch((error: Error) => {
            if (error.name === "FileNotFoundException") {
                throw error;
            } else {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }
        });
    }
}
