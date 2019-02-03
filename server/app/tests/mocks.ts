export class MongooseMockQuery {
    private data: Object;
    private isResolved: boolean;

    public constructor(data: Object, isResolved: boolean) {
        this.data = data;
        this.isResolved = isResolved;
    }

    public async select(): Promise<Object> {
        return (this.isResolved) ? Promise.resolve(this.data) : Promise.reject(this.data);
    }
}
