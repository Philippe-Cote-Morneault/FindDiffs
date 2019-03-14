export class EnumUtils {

    public static isStringInEnum(str: string, enumObj: Object): boolean {
        return enumObj.hasOwnProperty(str);
    }

    public static enumFromString<E>(str: string, enumObj: Object): E | undefined {
        if (!this.isStringInEnum(str, enumObj)) {
            return undefined;
        }

        return enumObj[str];
    }

    public static enumFromInt<E>(i: number, enumObj: Object): E | undefined {
        if (i < 0 || i >= this.enumLength(enumObj)) {
            return undefined;
        }

        return enumObj[i];
    }

    public static enumLength(enumObj: Object): number {
        // tslint:disable-next-line:no-magic-numbers
        return Object.keys(enumObj).length / 2;
    }
}
