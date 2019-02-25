import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { cube3, cylinder3 } from "./geometricObjectMocks";

const colorChangedObjects: Pair<string, number>[] = [
    {
        key: "sf34fsdfs",
        value: 0x4444,
    },
    {
        key: "435435wdc",
        value: 0x4444,
    },
    {
        key: "sddsdsdsdsddsfdsfsfds",
        value: 0x4444,
    },
];

const deletedObjects: string[] = [
    "kjhdhgf", "hgfhfsadfsf",
];

export const sceneModifications: ICommonGeometricModifications = {
    id: "dsgskfds32",
    colorChangedObjects: colorChangedObjects,
    type: ObjectType.Geometric,
    addedObjects: [cube3, cylinder3],
    deletedObjects: deletedObjects,
};
