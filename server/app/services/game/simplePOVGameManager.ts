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

    public playerClick(position: ICommon2DPosition, callBack: (data: Object | null) => void): void {
        this.pixelPositionService.postPixelPosition(this.game.ressource_id, position.x, position.y)
            .then((value: ICommonReveal | null) => {
                if (value && !this.differencesFound.get(value.difference_id)) {
                    this.differenceFound((value as ICommonReveal).difference_id);
                    callBack(value);
                } else {
                    callBack(null);
                }
            });
    }

    private differenceFound(differenceId: number): void {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === GameManager.SOLO_WINNING_DIFFERENCES_COUNT) {
            this.endGameCallback(this.game, this.game.players[0]);
        }
    }

}