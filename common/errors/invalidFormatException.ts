export class InvalidFormatException extends Error {
    constructor(m: string) {
        super(m);
        this.name = "InvalidFormatException";
        Object.setPrototypeOf(this, InvalidFormatException.prototype);
    }
}
