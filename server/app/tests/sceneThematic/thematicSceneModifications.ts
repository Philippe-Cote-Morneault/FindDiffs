import { Pair } from "../../../../common/model/pair";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../common/model/scene/scene";

const texturesChangedObjects: Pair<string, string>[] = [
    {
        key: "213123",
        value: "texture_car",
    },
    {
        key: "wwwe432",
        value: "texture_plane",
    },
    {
        key: "kkj5453wwm",
        value: "texture_bus",
    },
];

const deletedObjects: string[] = [
    "kjhdhgf", "hgfhfsadfsf", "23312321eae", "1233232eee",
];

export const sceneThematicModifications: ICommonThematicModifications = {
    id: "dsgskfds32",
    texturesChangedObjects: texturesChangedObjects,
    type: ObjectType.Geometric,
    addedObjects: [],
    deletedObjects: deletedObjects,
};
