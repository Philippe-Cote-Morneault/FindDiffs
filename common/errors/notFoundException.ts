export class NotFoundException extends Error {
    
    public constructor(m: string) {
        super(m);
        this.status = 404;
        this.name = "NotFoundException";
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
    public status: number;
}
