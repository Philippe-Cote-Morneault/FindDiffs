import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ICommonGame } from "../../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class MatchmakingService implements SocketSubscriber {

    private rightButtonText: string;
    private waitOpponent: boolean;

    public constructor(private socketService: SocketHandlerService, private router: Router) {
        this.rightButtonText = "Create";
        this.waitOpponent = false;
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.EndMatchmaking, this);
    }

    public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
        switch (event) {
            case Event.EndMatchmaking: {
                return this.endMatchmaking(message);
            }
            case Event.MatchmakingChange: {
                return this.changeMatchMakingType();
            }
            default: {
                break;
            }
        }
    }

    private endMatchmaking(message: ICommonSocketMessage): void {
        const game: ICommonGame = message.data as ICommonGame;
        const gameUrl: string = (game.pov) ? "/gameFree/" : "/gameSimple/";
        this.router.navigateByUrl(gameUrl + game.game_card_id);
    }

    public changeMatchMakingType(): void {
        this.waitOpponent = !this.waitOpponent;
        this.rightButtonText === "Create" ? this.rightButtonText = "Join" : this.rightButtonText = "Create";
    }
}
