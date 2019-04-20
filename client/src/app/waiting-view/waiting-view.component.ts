import { Component, EventEmitter, Output } from "@angular/core";
import { MatchmakingService } from "../services/game/matchmaking.service";

@Component({
  selector: "app-waiting-view",
  templateUrl: "./waiting-view.component.html",
  styleUrls: ["./waiting-view.component.css"],
})
export class WaitingViewComponent {
  @Output() public closed: EventEmitter<boolean>;

  public constructor(public matchmakingService: MatchmakingService) {
    this.closed = new EventEmitter();
  }

  public leaveWaiting(): void {
    this.closed.emit(true);
  }
}
