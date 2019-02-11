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
    ERROR: "Error",
    ERROR_NO_CHANGES: "No changes were detected!",
    ERROR_UNKOWN_ID: "The id could not be found.",
    ERROR_UNKOWN_RESOURCE_ID: "The resource id could not be found.",
    ERROR_MISSING: "%s is missing.",
    ERROR_MISSING_FIELD: "The field %s is not present.",
    ERROR_MISSING_FILES: "Files needs to be uploaded, no files were uploaded.",
    ERROR_WRONG_TYPE: "The %s type is not recognized.",
    ERROR_NOT_BMP_FILE: "Not a bmp file",
    ERROR_INVALID: "The %s is invalid.",
    ERROR_INVALID_SIZE: "Width is %d pixels, should be %d pixels",
    ERROR_INVALID_HEIGHT: "Height is %d pixels, should be %d pixels",
    ERROR_INVALID_FILE: "%s is not a file.",
    ERROR_USERNAME_TAKEN: "The username is already taken.",
    ERROR_DIFFERENCE_INVALID: "The game card should have 7 differences. It has %d differences.",

    ORIGINAL_IMAGE: "Original image",
    ORIGINAL_IMAGE_: "original image",
    MODIFIED_IMAGE: "Modified image",
    MODIFIED_IMAGE_: "modified image",
    NAME: "Name",
    NAME_: "name",
    POV: "POV",
    POV_: "pov",
    USERNAME: "Username",
    USERNAME_: "username",
    RESOURCE: "Resource",
    RESOURCE_: "resource",
    RESOURCE_ID_: "resource_id",

    SUCCESS: "Success",
    SUCCESS_GAME_CARD_UPDATED: "The gamecard was updated.",
    SUCCESS_GAME_CARD_DELETED: "The gamecard was deleted.",
    SUCCESS_USER_DELETED: "The user was deleted.",
};
