import * as mongoose from "mongoose";

export class DbConnectionHandler {
    private static DB_USER: string = "jesus";
    private static DB_PASSWORD: string = "potato123";
    private static DB_DB: string = "log2990-106";
    private static DB_HOST: string = "ds213255.mlab.com";
    private static DB_PORT: string = "13255";
    private static DB_URL: string = "mongodb://" + DbConnectionHandler.DB_USER + ":" +
                                    DbConnectionHandler.DB_PASSWORD + "@" + DbConnectionHandler.DB_HOST + ":" +
                                    DbConnectionHandler.DB_PORT + "/" + DbConnectionHandler.DB_DB;

    public connect(onConnect: Function, onError: Function): void {
        mongoose.connect(DbConnectionHandler.DB_URL, (err: Error) => {
            if (err) {
               onError();
            }
            onConnect();
        });
    }
}
