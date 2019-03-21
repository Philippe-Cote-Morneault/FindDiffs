import {expect} from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { NoErrorThrownException } from "../tests/noErrorThrownException";
import { DbConnectionHandler } from "./dbConnectionHandler";

describe("DatabaseConnectionHandler", () => {
    beforeEach(() => {
        sinon.stub(mongoose, "connect");
        sinon.stub(mongoose, "disconnect");
    });
    afterEach(() => {
        (mongoose.connect as sinon.SinonStub).restore();
        (mongoose.disconnect as sinon.SinonStub).restore();
    });
    describe("connect()", () => {
        it("Should connect without any error and call a callback when connected", () => {
            const db: DbConnectionHandler = new DbConnectionHandler();
            (mongoose.connect as sinon.SinonStub).yields(undefined);
            db.connect(() => {
                expect(true).to.equal(true);
            },         () => {
                throw new NoErrorThrownException();
            });
        });

        it("Should connect with an error and call a callback when an error occurs", () => {
            const db: DbConnectionHandler = new DbConnectionHandler();
            (mongoose.connect as sinon.SinonStub).yields(new Error("No internet"));
            db.connect(() => {
                throw new NoErrorThrownException();
            },         () => {
                expect(true).to.equal(true);
            });
        });
    });
    describe("disconnect()", () => {
        it("Should disconnect without any problem from the database", async () => {
            const db: DbConnectionHandler = new DbConnectionHandler();
            (mongoose.disconnect as sinon.SinonStub).resolves();
            await db.disconnect();
        });
    });
    describe("getInstance()", () => {
        it("Should be able to have a single intance of the database", async () => {
            expect(
                Object.is(DbConnectionHandler.getInstance(), DbConnectionHandler.getInstance()),
                ).to.equal(true);
        });
    });

});
