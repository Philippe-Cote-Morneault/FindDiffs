import { SocketHandler } from "./socketHandler";

export class SocketDispatcher {
    private socketHandler: SocketHandler;

    public constructor(socketHandler: SocketHandler) {
        this.socketHandler = socketHandler;
    }
}
