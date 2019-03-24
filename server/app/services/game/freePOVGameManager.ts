import { ICommon3DObject } from "../../../../common/model/positions";
import { ICommonReveal3D } from "../../../../common/model/reveal";
import { Game } from "../../model/game/game";
import { ScenePositionService } from "../difference/scenePositionService";
import { GameManager } from "./gameManager";

export class FreePOVGameManager extends GameManager {
    private scenePositionService: ScenePositionService;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        super(game, endGameCallback);
        this.scenePositionService = ScenePositionService.getInstance();
    }

    public playerClick(position: ICommon3DObject, successCallback: (data: Object | null) => void, failureCallback: () => void): void {
        this.scenePositionService.post3DClick(this.game.ressource_id, position.originalObjectId,
                                              position.modifiedObjectId, position.gameType)
            .then((value: ICommonReveal3D | null) => {
                if (value && !this.differencesFound.get(value.difference_id)) {
                    this.differenceFound((value as ICommonReveal3D).difference_id);
                    successCallback(value);
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
