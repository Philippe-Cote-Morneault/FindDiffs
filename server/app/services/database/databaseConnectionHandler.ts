import * as mongoose from "mongoose";

export class DatabaseConnectionHandler {
    private static DB_USER: string = "jesus";
    private static DB_PASSWORD: string = "potato123";
    private static DB_DB: string = "log2990-106";
    private static DB_HOST: string = "ds213255.mlab.com";
    private static DB_PORT: string = "13255";
    private static DB_URL: string = "mongodb://" + DatabaseConnectionHandler.DB_USER + ":" +
                                    DatabaseConnectionHandler.DB_PASSWORD + "@" + DatabaseConnectionHandler.DB_HOST + ":" +
                                    DatabaseConnectionHandler.DB_PORT + "/" + DatabaseConnectionHandler.DB_DB;

    //TODO: See if something needs to be here
    public constructor() {}

    public connect(onConnect: Function, onError: Function): void {
        mongoose.connect(DatabaseConnectionHandler.DB_URL, (err: Error) => {
            if (err) {
               onError();
            }
            onConnect();
        });
    }
}
