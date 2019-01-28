import {expect} from "chai";
import { DatabaseConnectionHandler } from "../databaseConnectionHandler";
import { UsernameGateway } from "./userGateway";

describe("Usernamegateway", () => {

    it("connect", () => {
        let db: DatabaseConnectionHandler = new DatabaseConnectionHandler();
        let gateway: UsernameGateway = new UsernameGateway(db.database);
        let doc: any = gateway.getUsername("booba");
        //db.connect();
        expect(doc).to.equal("");
    });

});