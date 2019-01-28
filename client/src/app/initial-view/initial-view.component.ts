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

  public verifyUsername(): void {
    const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  @HostListener("window:beforeunload", ["$event"])
  public beforeUnload($event): void  {
    const user: string = JSON.parse(localStorage.getItem("user") || "{}");
    this.initialViewService.getDeleteUsername(user).toPromise();
  }
  public correctUsername(message: Message): void {
    if (message != null) {
      localStorage.setItem("user", message.body);
      // TODO: Change view
    }
  }
}
