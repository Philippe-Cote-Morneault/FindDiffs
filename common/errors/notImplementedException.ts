export class NotImplementedException extends Error {
    constructor() {
        super("Method not implemented.");
        this.name = "NotImplementedException";
        Object.setPrototypeOf(this, NotImplementedException.prototype);
    }
}
