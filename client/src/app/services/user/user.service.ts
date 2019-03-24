import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
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
        this.socketService.subscribe(Event.AuthenticateError, this);
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        switch (event) {
            case Event.Authenticate: {
                return this.changeRouting();
            }
            case Event.AuthenticateError: {
                return this.alertErrorMessage(message);
            }
            default: {
                break;
            }
        }
    }

    private changeRouting(): void {
        this.router.navigateByUrl("/gamesList");
    }

    private alertErrorMessage(message: ICommonSocketMessage): void {
        alert(message.data);
    }
}
