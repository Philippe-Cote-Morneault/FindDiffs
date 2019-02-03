export class NoErrorThrownException extends Error {

    public constructor() {
        super("Expected an exception to be thrown in this test case. No error was thrown.");
        this.name = "NoErrorThrownException";
        Object.setPrototypeOf(this, NoErrorThrownException.prototype);
    }
}
