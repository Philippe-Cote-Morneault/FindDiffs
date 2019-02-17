export class StackEmptyException extends Error {
    constructor() {
        super("The stack cannot be popped since it's empty.");
        this.name = "StackEmptyException";
        Object.setPrototypeOf(this, StackEmptyException.prototype);
    }
}
