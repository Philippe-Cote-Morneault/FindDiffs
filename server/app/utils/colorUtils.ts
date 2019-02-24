export class ColorUtils {
    public static readonly WHITE: number = 0xFFFFFF;

    public static generateRandomColor(): number {
        return Math.floor(Math.random() * ColorUtils.WHITE);
    }
}
