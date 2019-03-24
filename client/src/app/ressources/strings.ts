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

    ZERO: "0",
    COLON: ":",
    PIXEL: "px",
    INLINE: "inline",
    NONE: "none",
    NOT_ALLOWED: "not-allowed",
    CONTEXT_MENU: "context-menu",
    DIFFERENCE_SOUND_SRC: "../../assets/mario.mp3",

    CHAT_DEFAULT: "This message type is not supported: ",
    CHAT_USERCONNECTED: " The user %s is now online!",
    CHAT_USERDISCONNECTED: " The user %s is now offline!",
    CHAT_BESTTIME: " %s is now %d place in the bests time of the game %s in %s.",
    CHAT_ERROR_SOLO: " Error.",
    CHAT_ERROR_1v1: " Error by %s.",
    CHAT_DIFFERENCE_SOLO: " Difference found.",
    CHAT_DIFFERENCE_1v1: "Difference found by %s.",
};
