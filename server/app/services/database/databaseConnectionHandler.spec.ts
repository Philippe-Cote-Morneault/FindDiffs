import {expect} from "chai";
import { DatabaseConnectionHandler } from "./databaseConnectionHandler";

describe("DatabaseConnectionHandler", () => {

    it("connect", () => {
        let db: DatabaseConnectionHandler = new DatabaseConnectionHandler();
        //db.connect();
        expect(db).to.equal("");
    });

});