import { RandomUtils } from "./randomUtils";

export class ColorUtils {
    public static readonly WHITE: number = 0xFFFFFF;

    public static generateRandomColor(): number {
        return  RandomUtils.random(ColorUtils.WHITE);
    }
    public static inverseColor(color: number ): number {
        // tslint:disable-next-line:no-bitwise
        return ~color & this.WHITE;
    }
}
