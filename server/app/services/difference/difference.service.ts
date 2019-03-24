import { Request } from "express";
import "reflect-metadata";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import * as BitmapHeader from "../../model/bitmap/header";
import { Position } from "../../model/bitmap/pixel";
import { _e, R } from "../../strings";
import { ApiRequest } from "../../utils/apiRequest";
import { IDifferenceService } from "../interfaces";
import { Service } from "../service";
import { RevealDifference } from "./revealDifference";
import { RevealDifference3D } from "./revealDifference3D";

export class DifferenceService extends Service implements IDifferenceService {

    public async postSimple(req: Request): Promise<string> {
        this.validateSimple(req);

        const differencePixels: number[] = await ApiRequest.getImagePairDiffJSONId(req.body.image_pair_id);

        const position: Position = new Position(Number(req.body.x), Number(req.body.y));
        const revealDifferences: RevealDifference = new RevealDifference(differencePixels, position);

        return JSON.stringify(revealDifferences.reveal());
    }

    private validateSimple(req: Request): void {

        if (isNaN(req.body.y) || isNaN(req.body.x)) {
            const fields: string = "x or y";
            throw new InvalidFormatException(_e(R.ERROR_N_A_N, [fields]));
        }

        if (Number(req.body.y) >= BitmapHeader.InfoHeader.EXPECTED_HEIGHT || Number(req.body.y) < 0 ||
            Number(req.body.x) >= BitmapHeader.InfoHeader.EXPECTED_WIDTH || Number(req.body.x) < 0) {
            throw new InvalidFormatException(R.ERROR_OUT_OF_BOUND);
        }

        if (!req.body.image_pair_id) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.IMAGE_PAIR_]));
        }
    }

    public async postFree(req: Request): Promise<string> {
        this.validateFree(req);

        const modifiedScene: ICommonSceneModifications = await ApiRequest.getModificationsById(req.body.scenePairId);

        const revealDifference3D: RevealDifference3D =
            new RevealDifference3D(modifiedScene, req.body.modifiedObjectId, req.body.originalObjectId, req.body.gameType);

        return JSON.stringify(revealDifference3D.reveal());
    }

    private validateFree(req: Request): void {
        if (!(req.body.scenePairId)) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.SCENE_PAIR_ID_]));
        }
    }
}
