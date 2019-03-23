import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
// import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
// import { SERVER_URL } from "../../../../../common/url";
import { SocketHandlerService } from "./socketHandler.service";

describe("SocketHandlerService", () => {
    let socket: SocketHandlerService;
    // let io: socketIo.Server;

    beforeEach(() => {
        socket = TestBed.get(SocketHandlerService);
            // tslint:disable-next-line:no-magic-numbers
        /*io = socketIo.listen(3000);
        io.on("connect", () => {
            io.on(Event.GameClick, () => {
                expect(true).to.equal(false);
            });
        });*/
    });

    it("Should connect the socket", () => {
        // const msg: ICommonSocketMessage = { data: "plz", timestamp: new Date()};
        expect(socket.emitClick(1, 1)).to.equal(1);
    });
});
