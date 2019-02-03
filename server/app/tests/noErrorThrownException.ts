export class NoErrorThrownException extends Error {

    public constructor() {
        super("Expected an error to be thrown in this test case. No error was thrown.");
        Object.setPrototypeOf(this, NoErrorThrownException.prototype);
    }
}
