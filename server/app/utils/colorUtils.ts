export class ColorUtils {
    public static readonly MAX_COLOR: number = 16777215; // 0xFFFFFF (white)

    public static generateColor(): number {
        return Math.round(Math.random() * this.MAX_COLOR);
    }
}
