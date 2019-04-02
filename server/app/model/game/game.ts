export interface Game {
    id: string;
    ressource_id: string;
    players: string[];
    start_time: Date | undefined;
    game_card_id: string;
}
