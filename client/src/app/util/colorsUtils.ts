
export class ColorsUtils {
    private static readonly HEX_NUMBER_BASE: number = 16;
    private static readonly HEX_NUMBER_OF_DIGITS: number = 6;

    public static generateRandomColor(): string {
        return "#" + Math.random().toString(ColorsUtils.HEX_NUMBER_BASE).substr(-ColorsUtils.HEX_NUMBER_OF_DIGITS);
    }
}
