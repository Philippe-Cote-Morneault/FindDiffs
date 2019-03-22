import { InvalidFormatException } from "../../../common/errors/invalidFormatException";
import { POVType } from "../../../common/model/gameCard";
import { ICommonImagePair } from "../../../common/model/imagePair";
import { GameCardService } from "../services/gameCard/gameCard.service";
import { _e, R } from "../strings";
import { ApiRequest } from "./apiRequest";

export class Validation {
    public static async validateResourceId(id: string, pov: POVType): Promise<void> {
        switch (pov) {
            case POVType.Simple:
                const imagePair: ICommonImagePair = await ApiRequest.getImagePairId(id);
                if (imagePair.differences_count !== GameCardService.NUMBER_OF_DIFFERENCES) {
                    throw new InvalidFormatException(_e(R.ERROR_DIFFERENCE_INVALID, [imagePair.differences_count]));
                }
                break;
            case POVType.Free:
                await ApiRequest.getSceneId(id);
                break;
            default:
                throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [R.POV_]));
        }
    }
}
