import * as mongoose from "mongoose";
import { gameCard } from "./schemas/gameCardSchema";

export class DatabaseConnectionHandler {
    private static DB_USER: string = "jesus";
    private static DB_PASSWORD: string = "potato123";
    private static DB_DB: string = "log2990-106";
    private static DB_HOST: string = "ds213255.mlab.com";
    private static DB_PORT: string = "13255";
    private static DB_URL: string = "mongodb://" + DatabaseConnectionHandler.DB_USER + ":" +
                                    DatabaseConnectionHandler.DB_PASSWORD + "@" + DatabaseConnectionHandler.DB_HOST + ":" +
                                    DatabaseConnectionHandler.DB_PORT + "/" + DatabaseConnectionHandler.DB_DB;

    //public database: Db;
    public constructor() {
        this.connect();
    }

    private connect(): void {

        mongoose.connect(DatabaseConnectionHandler.DB_URL, (err: Error) => {
            if (err) {
               // throw new Error("Connection to database failed");
                console.log("Could not connect to database");
            }
            
            let card = new gameCard({
                guid: "123213fssf",
                pov: "Simple",
                title: "this is the title",
                images: {
                    id: "12fdsfds",
                    url_difference: "urlDif",
                    url_modified: "urlMod",
                    url_original: "urlOg",
                    name: "name",
                    creation_date: new Date(),
                    differences_count: 7,
                },
                bestTimesSolo: [1, 2, 3],
                bestTimesOnline: [4, 5, 6],
            });
            card.save((err) => {
                if (err) {
                    console.error("error");
                    console.log(err);
                }
              });
        });

        /*
        MongoClient.connect(DatabaseConnectionHandler.DB_URL, {useNewUrlParser : true}, (err: Error, client: MongoClient) => {
            if (!err) {
                this.database = client.db(DatabaseConnectionHandler.DB_DB);
                console.log("Nous sommes connectés à " + this.database.databaseName);
            } else {
                console.log(err);
            }
        });
        */
    }
}