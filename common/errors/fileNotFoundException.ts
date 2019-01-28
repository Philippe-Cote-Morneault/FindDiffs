export class FileNotFoundException extends Error {
    constructor(filename: string) {
        super("The file "+ filename + " could not be found.");

        Object.setPrototypeOf(this, FileNotFoundException.prototype);
    }
}