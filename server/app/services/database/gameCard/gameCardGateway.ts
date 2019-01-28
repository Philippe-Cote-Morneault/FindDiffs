import { Db, Collection } from "mongodb";
import { GameCard } from "../../../../../common/model/gameCard/gameCard";

export class GameCardGateway {
    private static collectionName: string = "GameCards";
    private database: Db;
    private collection: Collection;

    public constructor(database: Db) {
        this.database = database;
        this.setup();
    }

    public getGameCard(username: string): any {
         this.collection.findOne({name: username, }, (err: Error, doc: any) => {
            return doc;
        });
    }

    public addGameCard(gameCard: GameCard): void {
        this.collection.insertOne({
            id: gameCard.id,
            pov: gameCard.pov,
            title: gameCard.title,
            originalImage: gameCard.originalImage,
            modifiedImage: gameCard.modifiedImage,
            differencesImage: gameCard.differencesImage,
            bestTimesSolo: gameCard.bestTimeSolo,
            bestTImesOnline: gameCard.bestTimeOnline,
        });
    }

    private setup(): void {
        this.database.listCollections({name: GameCardGateway.collectionName})
            .next((err: Error, collinfo: string) => {
                if (collinfo) {
                    console.log("Collection exists");
                    this.collection = this.database.collection(GameCardGateway.collectionName);
                }
                else {
                    console.log("Collection does not exist");
                    this.createCollection();
                }
            });
    }

    private createCollection(): void {
        this.database.createCollection(GameCardGateway.collectionName, (err: Error, collection: Collection) => {
            if (!err) {
                this.collection = collection;
            }
            else {
                console.log("Could not create collection");
            }
        });
    }
}