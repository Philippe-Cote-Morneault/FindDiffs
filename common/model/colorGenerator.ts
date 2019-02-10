export class ColorGenerator {
    public static readonly MAX_COLOR: number = 16777215;

    public static generateColor(): number {

        return Math.round(Math.random() * this.MAX_COLOR);
    }
}