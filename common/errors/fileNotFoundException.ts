import { NotFoundException } from "./notFoundException";

export class FileNotFoundException extends NotFoundException {
    constructor(filename: string) {
        super("The file "+ filename + " could not be found.");
        this.name = "FileNotFoundException";
        Object.setPrototypeOf(this, FileNotFoundException.prototype);
    }
}