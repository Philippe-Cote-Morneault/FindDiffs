import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Event } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class UserService implements SocketSubscriber {
    private router: Router;

    public constructor(private socketService: SocketHandlerService) {
        this.subscribeToSocket();
    }

    public setContainers(router: Router): void {
        this.router = router;
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.Authenticate, this);
    }

    public notify(): void {
        this.router.navigateByUrl("/gamesList");
    }
}
