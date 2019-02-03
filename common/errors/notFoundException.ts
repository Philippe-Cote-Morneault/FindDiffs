export class NotFoundException extends Error {
    
    public constructor(m: string) {
        super(m);
        this.status = 404;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
    public status: number;
}
