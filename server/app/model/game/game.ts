export interface Game {
    id: string;
    ressource_id: string;
    players: string[];
    start_time: Date | undefined;
    differences_found: number;
}
