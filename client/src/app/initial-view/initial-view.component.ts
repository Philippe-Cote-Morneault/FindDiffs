import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { InitialViewService } from "../initial-view.service";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

  public constructor(public initialViewService: InitialViewService, private router: Router, private socketService: SocketService) { }
  public title: string = "Spot the Differences";
  public button: string = "Accept";

  public verifyUsername(): void {
    const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
    this.socketService.sendUsername(username);
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername.bind(this));
  }

  @HostListener("window:beforeunload", ["$event"])
  public beforeUnload($event: Event): void  {
    const user: string = JSON.parse(localStorage.getItem("user") || "{}");
    this.initialViewService.getDeleteUsername(user).toPromise();
  }

  public correctUsername(message: Message): void {
    if (message) {
      localStorage.setItem("user", message.body);
      this.router.navigateByUrl("/admin");
    } else {
      alert("Invalid username!");
    }
  }
}
