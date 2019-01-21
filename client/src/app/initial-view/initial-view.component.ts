import { Component, HostListener } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { InitialViewService } from "../initial-view.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

  public constructor(public initialViewService: InitialViewService) { }
  public title: string = "Spot the Differences";
  public button: string = "Accept";
  public user: string = "";
  public verifyUsername(): void {
    const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  @HostListener("window:beforeunload") public beforeUnloadHander(): void {
    this.initialViewService.getDeleteUsername(this.user).subscribe();
  }
  public correctUsername(message: Message): void {
    // this.user = message.body;
    console.log(message);
  }
}
