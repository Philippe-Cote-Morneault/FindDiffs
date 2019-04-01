import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-waiting-view",
  templateUrl: "./waiting-view.component.html",
  styleUrls: ["./waiting-view.component.css"],
})
export class WaitingViewComponent {
  @Output() public closed: EventEmitter<boolean>;

  public constructor() {
    this.closed = new EventEmitter();
  }

  public leaveWaiting(): void {
    this.closed.emit(true);
  }
}
