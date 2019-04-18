import { Injectable } from "@angular/core";
import { ICommonGameEnding } from "../../../../../common/communication/webSocket/gameEnding";
import { ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { GameEnding } from "../../models/game/gameEnding";
import { ControlsGenerator } from "../scene/sceneRenderer/controlsGenerator";
import { SceneSyncerService } from "../scene/sceneSyncer/sceneSyncer.service";
import { SocketSubscriber } from "../socket/socketSubscriber";
import { GameService } from "./game.service";

@Injectable({
    providedIn: "root",
})
export class GameFreePOVService extends GameService implements SocketSubscriber  {
    private sceneSyncer: SceneSyncerService;

    public setControls(sceneSyncer: SceneSyncerService): void {
        this.sceneSyncer = sceneSyncer;
    }

    protected startGame(): void {
        this.timer.start();
        this.gameStarted = true;
        this.timer.addEventListener("secondsUpdated", () =>
            this.chronometer.next(this.getTimeValues()));
        this.setControlsLock(false);
    }

    protected stopGame(message: ICommonSocketMessage): void {
        this.timer.stop();
        this.setControlsLock(true);
        const time: string = this.playerTimeService.formatPlayerTimer(message);
        const winner: string = (message.data as ICommonGameEnding).winner;
        const game: GameEnding = {
            isGameOver: true,
            winner: winner,
            time: time,
        };
        this.chronometer.next(time);
        this.gameEnded.next(game);
    }

    private setControlsLock(isLocked: boolean): void {
        ControlsGenerator.isLocked = isLocked;
        this.sceneSyncer.isLocked = isLocked;
    }
}
