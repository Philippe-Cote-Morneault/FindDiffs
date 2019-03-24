import { GameManager } from "./gameManager";
import { PixelPositionService } from "../difference/pixelPosition.service";
import { Game } from "../../model/game/game";
import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";

export class SimplePOVGameManager extends GameManager {
    private pixelPositionService: PixelPositionService;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        super(game, endGameCallback);
        this.pixelPositionService = PixelPositionService.getInstance();
    }

    public playerClick(position: ICommon2DPosition, callBack: (data: Object | null) => void): void {
        console.log("inOnPlayerClick");
        this.pixelPositionService.postPixelPosition(this.game.ressource_id, position.x, position.y)
            .then((value: ICommonReveal | null) => {
                console.log(value);
                if (value && !this.differencesFound.get(value.difference_id)) {
                    console.log("isIcommonreveal");
                    this.differenceFound((value as ICommonReveal).difference_id);

                    callBack(value);
                } else {
                    console.log("isNull");
                    callBack(null);
                }
            });
    }

    private differenceFound(differenceId: number): void {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === 7) {
            this.endGameCallback(this.game, this.game.players[0]);
        }
    }

}