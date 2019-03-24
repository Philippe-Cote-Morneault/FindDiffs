import * as axios from "axios";
import { ICommon3DObject } from "../../../../common/model/positions";
import { ICommonReveal3D } from "../../../../common/model/reveal";
import { ObjectType } from "../../../../common/model/scene/scene";

export class ScenePositionService {
    private static instance: ScenePositionService;

    public static getInstance(): ScenePositionService {
        if (!ScenePositionService.instance) {
            ScenePositionService.instance = new ScenePositionService();
        }

        return ScenePositionService.instance;
    }

    public async post3DClick(scenePairId: string, originalObjectId: string, modifiedObjectId: string,
                             gameType: ObjectType): Promise<ICommonReveal3D | null> {
        const requestBody: ICommon3DObject = {
            scenePairId: scenePairId,
            originalObjectId: originalObjectId,
            modifiedObjectId: modifiedObjectId,
            gameType: gameType,
        };
        try {
            return (await axios.default.post("http://localhost:3000/difference/free", requestBody)).data as ICommonReveal3D;
        } catch (error) {
            return null;
        }
    }
}
