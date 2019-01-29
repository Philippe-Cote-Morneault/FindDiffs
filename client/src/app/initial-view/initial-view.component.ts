import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { InitialViewService } from "../initial-view.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

  public constructor(public initialViewService: InitialViewService, private router: Router) { }
  public title: string = "Spot the Differences";
  public button: string = "Accept";
  public isLogged: boolean = false;

  public verifyUsername(): void {
    const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername.bind(this));
  }

  @HostListener("window:beforeunload", ["$event"])
  public beforeUnload($event: Event): void  {
    const user: string = JSON.parse(localStorage.getItem("user") || "{}");
    this.initialViewService.getDeleteUsername(user).toPromise();
    this.isLogged = false;
  }
  public correctUsername(message: Message): void {
    if (message != null) {
      this.isLogged = true;
      localStorage.setItem("user", message.body);
      this.router.navigateByUrl("/admin");

    } else {
      alert("Invalid username!");
    }
  }
}
