export class UsernameValidator {
    private static readonly CHECK_NAME_REGEX: string = "^[a-zA-Z0-9]{3,12}$";

    public static validateUsername(username: string): boolean {
        const checkNameRegex: RegExp = new RegExp(UsernameValidator.CHECK_NAME_REGEX);

        return checkNameRegex.test(username);
    }
}
