import { Db, Collection } from "mongodb";
import { GameCard } from "../../../../../common/model/gameCard/gameCard";
import { GameCardInfo } from "../../../../../common/model/gameCard/gameCardInfo";
import { GameCardImages } from "../../../../../common/model/gameCard/gameCardImages";

export class GameCardGateway {
    private static collectionName: string = "GameCards";
    private database: Db;
    private collection: Collection<GameCard[]>;

    public constructor(database: Db) {
        this.database = database;
        this.setup();
    }

    public getGameCard(id: string): GameCard {
        return this.collection.findOne({id: id});
    }

    public addGameCard(gameCard: GameCard): void {
        this.collection.insertOne({
            id: gameCard.info.id,
            pov: gameCard.info.pov,
            title: gameCard.info.title,
            originalImage: gameCard.images.originalImage,
            modifiedImage: gameCard.images.modifiedImage,
            differencesImage: gameCard.images.differencesImages,
            bestTimesSolo: gameCard.bestTimesSolo,
            bestTimesOnline: gameCard.bestTimesOnline,
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