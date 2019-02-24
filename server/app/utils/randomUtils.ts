export class RandomUtils {
    public static generateInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
