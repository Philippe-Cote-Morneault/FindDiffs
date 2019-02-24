export interface ICommonGameCard {
    id: string;
    pov: POVType;
    title: string;
    resource_id: string;
    best_time_solo: ICommonScoreEntry[];
    best_time_online: ICommonScoreEntry[];
}

export interface ICommonScoreEntry {
    name: string,
    score: number,
}
export enum POVType{Simple, Free};