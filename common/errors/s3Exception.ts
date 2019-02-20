export class S3Exception extends Error {
    
    public constructor(m: string | undefined) {
        (!m) ? super("An error occured with S3.") : super(m);
        this.status = 503;
        this.name = "S3Exception";
        Object.setPrototypeOf(this, S3Exception.prototype);
    }
    public status: number;
}
