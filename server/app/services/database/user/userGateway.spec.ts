import {expect} from "chai";
import { DatabaseConnectionHandler } from "../databaseConnectionHandler";
import { UserGateway } from "./userGateway";

describe("Usergateway", () => {

    it("connect", () => {
        let db: DatabaseConnectionHandler = new DatabaseConnectionHandler();
        let gateway: UserGateway = new UserGateway(db.database);
        let doc: any = gateway.getUsername("test");
        //db.connect();
        expect(doc).to.equal("");
    });

});