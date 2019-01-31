import {expect} from "chai";
import { DbConnectionHandler } from "../dbConnectionHandler";
import { UserGateway } from "./userGateway";

describe("Usergateway", () => {

    it("connect", () => {
        const db: DbConnectionHandler = new DbConnectionHandler();
        const gateway: UserGateway = new UserGateway(db.database);
        const doc: any = gateway.getUsername("test");
        //db.connect();
        expect(doc).to.equal("");
    });

});
