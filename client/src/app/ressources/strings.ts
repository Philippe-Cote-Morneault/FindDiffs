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
    ERROR_SOUND_SRC: "../../assets/no.mp3",

    GAME_CARD_SIMPLE: "/gameSimple/",
    GAME_CARD_FREE: "/gameFree/",
    GAME_CARD_DELETED: "This game has been deleted, please try another one.",
    GAME_CARD_CONFIRM_DELETE: "Are you sure you want to delete the Game Card called %s ?",
    GAME_CARD_CONFIRM_RESET: "Are you sure you want to reset the best times of the Game Card called %s ?",

    CHAT_SOLO: "solo",
    CHAT_ONLINE: "1v1",
    CHAT_DEFAULT: "This message type is not supported: ",
    CHAT_USERCONNECTED: " The user %s is now online!",
    CHAT_USERDISCONNECTED: " The user %s is now offline!",
    CHAT_BESTTIME: " %s is now %d place in the bests time of the game %s in %s.",
    CHAT_ERROR_SOLO: " Error.",
    CHAT_ERROR_1v1: " Error by %s.",
    CHAT_DIFFERENCE_SOLO: " Difference found.",
    CHAT_DIFFERENCE_1v1: " Difference found by %s.",

    MESSAGE_WIN: "You win!",
    MESSAGE_LOSE: "You lose!",
};
