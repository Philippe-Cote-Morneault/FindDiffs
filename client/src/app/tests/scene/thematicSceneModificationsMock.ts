import { Pair } from "../../../../../common/model/pair";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { cone, lambo, signStop } from "./thematicObjectMocks";

const deletedObjects: string[] = [
    "kjhdhgf", "hgfhfsadfsf",
];

const texturesChangedObjects: Pair<string, string>[] = [
    {
        key: "sf34fsdfs",
        value: "meter_2.jpg",
    },
    {
        key: "435435wdc",
        value: "bin_2.jpg",
    },
    {
        key: "sddsdsdsdsddsfdsfsfds",
        value: "eclipse_2.jpg",
    },
];

export const thematicSceneModifications: ICommonThematicModifications = {
    id: "dsgskfds32",
    type: ObjectType.Thematic,
    addedObjects: [cone, lambo, signStop],
    deletedObjects: deletedObjects,
    texturesChangedObjects: texturesChangedObjects,
};
