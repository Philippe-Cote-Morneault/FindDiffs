export class InvalidFormatException extends Error {
    constructor(m: string) {
        super(m);

        Object.setPrototypeOf(this, InvalidFormatException.prototype);
    }
}
