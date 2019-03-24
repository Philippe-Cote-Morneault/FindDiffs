import { ICommon3DObject } from "../../../../common/model/positions";
import { Game } from "../../model/game/game";
import { ScenePositionService } from "../difference/scenePositionService";
import { GameManager } from "./gameManager";

export class FreePOVGameManager extends GameManager {
    private scenePositionService: ScenePositionService;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        super(game, endGameCallback);
        this.scenePositionService = ScenePositionService.getInstance();
    }
    public playerClick(position: ICommon3DObject, successCallack: (data: Object | null) => void, failureCallback: () => void): void {
        this.scenePositionService.post3DClick(this.game.ressource_id, position.originalObjectId,
                                              position.modifiedObjectId, position.gameType);
    }
}
