export class NoErrorThrownException extends Error {

    public constructor() {
        super("Expected an exception to be thrown in this test case. No error was thrown.");
        Object.setPrototypeOf(this, NoErrorThrownException.prototype);
    }
}
