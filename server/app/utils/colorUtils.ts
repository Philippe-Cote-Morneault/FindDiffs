export class ColorUtils {
    public static readonly numberOfHexColors: number = 16777215;

    public static generateRandomColor(): number {
        return Math.floor(Math.random() * ColorUtils.numberOfHexColors);
    }
}
