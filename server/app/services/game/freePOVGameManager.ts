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

    public async playerClick(position: ICommon3DObject,
                             successCallback: (data: Object | null) => void,
                             failureCallback: () => void): Promise<void> {

        await this.scenePositionService.post3DClick(this.game.ressource_id, position.originalObjectId,
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
}
