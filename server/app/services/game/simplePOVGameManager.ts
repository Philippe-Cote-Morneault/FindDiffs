import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { PixelPositionService } from "../difference/pixelPosition.service";
import { GameManager } from "./gameManager";

export class SimplePOVGameManager extends GameManager {
    private pixelPositionService: PixelPositionService;

    public constructor(game: Game, winningDifferenceCount: number,
                       endGameCallback: (game: Game, winner: string, score: INewScore) => void) {

        super(game, winningDifferenceCount, endGameCallback);
        this.pixelPositionService = PixelPositionService.getInstance();
    }

    public async playerClick(position: ICommon2DPosition, player: string,
                             successCallBack: (data: Object | null) => void,
                             failureCallback: () => void): Promise<void> {
        try {
            await this.pixelPositionService.postPixelPosition(this.game.ressource_id, position.x, position.y)
                .then(async (value: ICommonReveal | null) => {
                    if (value && !this.isDifferenceFound(value.difference_id.toString())) {
                        await this.differenceFound((value as ICommonReveal).difference_id.toString(), player);
                        successCallBack(value);
                    } else {
                        failureCallback();
                    }
                });
        } catch (error) {
            failureCallback();
        }
    }
}
