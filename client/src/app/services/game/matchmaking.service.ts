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
    private isActive: boolean;

    public constructor(private socketService: SocketHandlerService, private router: Router) {
        this.isActive = false;
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.EndMatchmaking, this);
    }

    public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
        const game: ICommonGame = message.data as ICommonGame;
        const gameUrl: string = (game.pov) ? "/gameFree/" : "/gameSimple/";
        this.router.navigateByUrl(gameUrl + game.game_card_id);
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }
}
