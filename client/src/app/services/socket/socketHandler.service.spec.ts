import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "./socketHandler.service";

describe("ChatFormater", () => {
    let service: SocketHandlerService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(SocketHandlerService);
    });

    it("Should emit the right message to the server when a new user is connected", () => {
        const msg: ICommonSocketMessage = {data: "", timestamp: new Date()};

        const event: Event = Event.NewUser;
        spyOn(service.socket, "emit").and.callFake((event: Event, msg: ICommonSocketMessage) => { });
        service.emitMessage(event, msg);
        expect(service.socket.emit).toHaveBeenCalledWith(event, msg);
    });
});
