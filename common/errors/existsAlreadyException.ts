export class ExistsAlreadyException extends Error {
    
    public constructor(m: string) {
        super(m);
        this.status = 409;
        this.name = "ExistsAlreadyException";
        Object.setPrototypeOf(this, ExistsAlreadyException.prototype);
    }
    public status: number;
}
