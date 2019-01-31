import {expect} from "chai";
import { DbConnectionHandler } from "../dbConnectionHandler";
import { UserGateway } from "./userGateway";

describe("Usergateway", () => {

    it("connect", () => {
        let db: DbConnectionHandler = new DbConnectionHandler();
        let gateway: UserGateway = new UserGateway(db.database);
        let doc: any = gateway.getUsername("test");
        //db.connect();
        expect(doc).to.equal("");
    });

});