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
}
