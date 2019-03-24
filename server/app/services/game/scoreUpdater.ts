export class ScoreUpdater {
    private static instance: ScoreUpdater;

    public static getInstance(): ScoreUpdater {
        if (!ScoreUpdater.instance) {
            ScoreUpdater.instance = new ScoreUpdater();
        }

        return ScoreUpdater.instance;
    }

    //public updateScore(): 
}
