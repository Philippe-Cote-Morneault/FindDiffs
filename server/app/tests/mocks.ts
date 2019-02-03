export class MongooseMockQuery {
    private data: Object;

    public constructor(data: Object) {
        this.data = data;
    }

    public async select(): Promise<Object> {
        return Promise.resolve(this.data);
    }
}
