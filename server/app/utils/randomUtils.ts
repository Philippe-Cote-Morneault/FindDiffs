export class RandomUtils {
    public static inRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public static inRangeInt(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
    public static random(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
