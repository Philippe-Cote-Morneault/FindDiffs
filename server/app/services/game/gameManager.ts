export class GameManager {
    private players: string[];
    private ressourceId: string;
    public constructor(firstPlayer: string, ressourceId: string) {
        this.players = [firstPlayer];
        this.ressourceId = ressourceId;
    }
}