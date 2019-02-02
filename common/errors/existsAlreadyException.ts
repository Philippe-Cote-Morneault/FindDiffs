export class ExistsAlreadyException extends Error {
    
    public constructor(m: string) {
        super(m);
        this.status = 401;
        Object.setPrototypeOf(this, ExistsAlreadyException.prototype);
    }
    public status: number;
}
