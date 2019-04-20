import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "chai";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { IdentificationError } from "../IdentificationError/identificationError.service";
import { GameService } from "../game/game.service";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { CanvasLoaderService } from "./canvasLoader.service";

describe("CanvasLoaderService", () => {
    let service: CanvasLoaderService;
    let error: IdentificationError;
    let game: GameService;
    let socket: SocketHandlerService;
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.get(CanvasLoaderService);
        game = TestBed.get(GameService);
        error = TestBed.get(IdentificationError);
        socket = TestBed.get(SocketHandlerService);
    });

    it("Should add an eventListner to an HTML canvas", async () => {
        const dummyContainer: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
        expect(JSON.stringify(dummyContainer)).to.equal("{}");

        service.loadCanvas(dummyContainer, "345345345");
        expect(JSON.stringify(dummyContainer)).to.not.equal("{}");
    });

    it("Should emit a message when a clic happens", async () => {
        let hasBeenCalled: boolean = false;
        const msg: ICommonSocketMessage = { data: "", timestamp: new Date()};
        await game.notify(Event.GameStarted, msg);
        // tslint:disable-next-line:no-empty
        spyOn(error, "moveClickError").and.callFake(() => {});
        spyOn(socket, "emitMessage").and.callFake(() => {
            hasBeenCalled = true;
        });
        // tslint:disable-next-line:no-any
        const e: any = "{layerX: 3, layerY: 2}";
        service["getClickPosition"](e);
        expect(hasBeenCalled).to.equal(true);
        await game.notify(Event.GameEnded, msg);
    });
});
