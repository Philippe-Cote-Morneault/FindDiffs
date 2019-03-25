import { FreePOVGameManager } from "./freePOVGameManager";
import { Game } from "../../model/game/game";
import { ICommon3DObject } from "../../../../common/model/positions";
import { ObjectType } from "../../../../common/model/scene/scene";

describe("FreePOVGameManager", () => {
    const game: Game = {
        id: "fdsf433r2 2fkede20",
        ressource_id: "fdsfd2343rfds",
        players: ["phil"],
        start_time: new Date(),
        differences_found: 0,
        game_card_id: "asdsafgresc3242refsd"
    }
    const callback = (game: Game, winner: string) => {

    }

    const successCallback = (data: Object) => {

    }

    const failureCallback = () => {

    }

    const position: ICommon3DObject = {
        scenePairId: "r23fjk23kdew",
        originalObjectId: "0kd2dmddsfs",
        modifiedObjectId: "d22r3jmdfs32",
        gameType: ObjectType.Thematic, 
    }
    const manager: FreePOVGameManager = new FreePOVGameManager(game, callback);

    describe("playerClick", () => {
        manager.playerClick(position, successCallback, failureCallback) {
            
        }
    })
});