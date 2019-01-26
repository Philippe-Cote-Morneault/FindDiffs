import { Db, Collection } from "mongodb";

export class UsernameGateway {
    private static collectionName: string = "Usernames";
    private database: Db;
    private collection: Collection;

    public constructor(database: Db) {
        this.database = database;
        this.setup();
    }

    public getUsername(username: string): any {
         this.collection.findOne({name: username, }, (err: Error, doc: any) => {
            return doc;
        });
    }

    public addUsername(username: string): void {
        this.collection.insertOne({
            name: username,
        });
    }

    private setup(): void {
        this.database.listCollections({name: UsernameGateway.collectionName})
            .next((err: Error, collinfo: string) => {
                if (collinfo) {
                    console.log("Collection exists");
                    this.collection = this.database.collection(UsernameGateway.collectionName);
                }
                else {
                    console.log("Collection does not exist");
                    this.createCollection();
                }
            });
    }

    private createCollection(): void {
        this.database.createCollection(UsernameGateway.collectionName, (err: Error, collection: Collection) => {
            if (!err) {
                this.collection = collection;
            }
            else {
                console.log("Could not create collection");
            }
        });
    }
}
