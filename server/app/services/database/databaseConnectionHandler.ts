import { Db, MongoClient } from "mongodb";
import { UserGateway } from "./user/userGateway";

export class DatabaseConnectionHandler {
    private static DB_USER: string = "jesus";
    private static DB_PASSWORD: string = "potato123";
    private static DB_DB: string = "log2990-106";
    private static DB_HOST: string = "ds213255.mlab.com";
    private static DB_PORT: string = "13255";
    private static DB_URL: string = "mongodb://" + DatabaseConnectionHandler.DB_USER + ":" +
                                    DatabaseConnectionHandler.DB_PASSWORD + "@" + DatabaseConnectionHandler.DB_HOST + ":" +
                                    DatabaseConnectionHandler.DB_PORT + "/" + DatabaseConnectionHandler.DB_DB;

    public database: Db;
    public constructor() {
        this.connect();
    }

    private connect(): void {
        MongoClient.connect(DatabaseConnectionHandler.DB_URL, {useNewUrlParser : true}, (err: Error, client: MongoClient) => {
            if (!err) {
                this.database = client.db(DatabaseConnectionHandler.DB_DB);
                console.log("Nous sommes connectés à " + this.database.databaseName);
                new UserGateway(this.database);
            }
            else {
                console.log(err);
            }
        });
    }
}