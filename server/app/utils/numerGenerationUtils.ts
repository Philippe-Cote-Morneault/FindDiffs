export class NumberGenerationUtils {
    public static generateInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
