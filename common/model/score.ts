import { GameType } from "./gameCard";

export interface INewScore {
    is_top_score: boolean;
    details?: INewScoreDetails;
}

export interface INewScoreDetails {
    place: number;
    game_name: string;
    username: string;
    game_type: GameType;
}