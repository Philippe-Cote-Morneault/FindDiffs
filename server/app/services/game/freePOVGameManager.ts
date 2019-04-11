import { ICommon3DObject } from "../../../../common/model/positions";
import { ICommonReveal3D } from "../../../../common/model/reveal";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScenePositionService } from "../difference/scenePositionService";
import { GameManager } from "./gameManager";

export class FreePOVGameManager extends GameManager {
    private scenePositionService: ScenePositionService;

    public constructor(game: Game, winningDifferenceCount: number,
                       endGameCallback: (game: Game, winner: string, score: INewScore) => void) {

        super(game, winningDifferenceCount, endGameCallback);
        this.scenePositionService = ScenePositionService.getInstance();
    }

    public async playerClick(position: ICommon3DObject, player: string,
                             successCallback: (data: Object | null) => void,
                             failureCallback: () => void): Promise<void> {

        try {
        await this.scenePositionService.post3DClick(this.game.ressource_id, position.originalObjectId,
                                                    position.modifiedObjectId, position.gameType)
            .then(async (value: ICommonReveal3D | null) => {
                if (value && !this.isDifferenceFound(player, value.difference_id.toString())) {
                    await this.differenceFound((value as ICommonReveal3D).difference_id, player);
                    successCallback(value);
                } else {
                    failureCallback();
                }
            });
        } catch (error) {
            failureCallback();
        }
    }
}
