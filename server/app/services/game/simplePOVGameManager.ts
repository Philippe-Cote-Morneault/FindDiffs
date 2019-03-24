import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";
import { Game } from "../../model/game/game";
import { PixelPositionService } from "../difference/pixelPosition.service";
import { GameManager } from "./gameManager";

export class SimplePOVGameManager extends GameManager {
    private pixelPositionService: PixelPositionService;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        super(game, endGameCallback);
        this.pixelPositionService = PixelPositionService.getInstance();
    }

    public playerClick(position: ICommon2DPosition,
                       successCallBack: (data: Object | null) => void,
                       failureCallback: () => void): void {

        this.pixelPositionService.postPixelPosition(this.game.ressource_id, position.x, position.y)
            .then((value: ICommonReveal | null) => {
                if (value && !this.differencesFound.get(value.difference_id.toString())) {
                    this.differenceFound((value as ICommonReveal).difference_id.toString());
                    successCallBack(value);
                } else {
                    failureCallback();
                }
            });
    }

    private differenceFound(differenceId: string): void {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === GameManager.SOLO_WINNING_DIFFERENCES_COUNT) {
            this.endGameCallback(this.game, this.game.players[0]);
        }
    }

}