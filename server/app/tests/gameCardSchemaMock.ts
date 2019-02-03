export class GameCardSchemaMock {

    // tslint:disable-next-line:variable-name
    public best_time_online: number[];
    // tslint:disable-next-line:variable-name
    public best_time_solo: number[];

    private onSave: Function;

    public constructor(onSave: Function) {
        this.best_time_solo = new Array();
        this.best_time_online = new Array();

        this.onSave = onSave;
    }

    public async save(): Promise<void> {
        return Promise.resolve(this.onSave(this));
    }
}
