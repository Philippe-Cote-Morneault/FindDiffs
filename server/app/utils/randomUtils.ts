export class RandomUtils {
    public static inRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
