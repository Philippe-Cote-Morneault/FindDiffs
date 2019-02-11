export interface ICommonGameCard {
    id: string;
    pov: POVType;
    title: string;
    resource_id: string;
    best_time_solo: number[];
    best_time_online: number[];
}

export enum POVType{Simple, Free};