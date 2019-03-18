import { vsprintf } from "sprintf-js";

interface IString {
    [key: string]: string;
}
// Method to shorthen the call to vsprintf
// tslint:disable-next-line:no-any only-arrow-functions
export function _e(format: string, args: any[]): string {
    return vsprintf(format, args);
}

export const R: IString = {
    SOCKET_DEFAULT: " The message type is not supported.",
    SOCKET_USERCONNECTED: " The user %s is now online!",
    SOCKET_USERDISCONNECTED: " The user %s is now offline!",
};
