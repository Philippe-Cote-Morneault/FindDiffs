import { Request } from "express";
import "reflect-metadata";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { Bitmap } from "../../model/bitmap/bitmap";
import * as BitmapHeader from "../../model/bitmap/header";
import { Position } from "../../model/bitmap/pixel";
import { _e, R } from "../../strings";
import { ApiRequest } from "../../utils/apiRequest";
import { BitmapDecoder } from "../imagePair/bitmapDecoder";
import { IDifferenceService } from "../interfaces";
import { Service } from "../service";
import { RevealDifference } from "./revealDifference";

export class DifferenceService extends Service implements IDifferenceService {

    public async postSimple(req: Request): Promise<string> {
        this.validateSimple(req);

        const differenceBitmap: Bitmap = BitmapDecoder.FromArrayBuffer(
            await ApiRequest.getImagePairDiffId(req.body.image_pair_id),
        );
        const position: Position = new Position(Number(req.body.x), Number(req.body.y));
        const revealDifferences: RevealDifference = new RevealDifference(differenceBitmap, position);

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
        throw new Error("Method not implemented.");
    }

}
