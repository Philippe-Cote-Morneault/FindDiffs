import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GamesCardViewComponent } from "src/app/games-card-view/games-card-view.component";
import { ICommonGame } from "../../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { SocketSubscriber } from "../socket/socketSubscriber";

@Injectable({
    providedIn: "root",
})
export class MatchmakingService implements SocketSubscriber {
    private isActive: boolean;

    private gameList: GamesCardViewComponent[];

    public constructor(private socketService: SocketHandlerService, private router: Router) {
        this.isActive = false;
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
                return this.changeMatchmakingType(message);
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

    private changeMatchmakingType(message: ICommonSocketMessage): void {
        const gameIDs: string[] = message.data as string[];
        this.gameList.forEach((game: GamesCardViewComponent) => {
            gameIDs.includes(game.scenePair.id) ? game.rightButton = "Join" : game.rightButton = "Create";
        });
    }

    public setGameList(list: GamesCardViewComponent[]): void {
        this.gameList = list;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }
}
