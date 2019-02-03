export class ScoreGenerator {
    private static readonly MIN: number = 60;
    private static readonly MAX: number = 90;

    public static generateScore(length: number): number[] {

        const generatedNumbers: number[] = new Array<number>();
        for (let i: number = 0; i < length; i++) {
            generatedNumbers.push(this.generateNumber(this.MIN, this.MAX));
        }

        return generatedNumbers.sort();
    }

    private static generateNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}