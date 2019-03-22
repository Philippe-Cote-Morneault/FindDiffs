import { Pair } from "../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ObjectType } from "../../../../common/model/scene/scene";
import { cube3, cylinder3 } from "./geometricObjectMocks";

export const sceneModifications: ICommonGeometricModifications = {
    id: "dsgskfds32",
    colorChangedObjects: colorChangedObjects,
    type: ObjectType.Geometric,
    addedObjects: [cube3, cylinder3],
    deletedObjects: deletedObjects,
};
