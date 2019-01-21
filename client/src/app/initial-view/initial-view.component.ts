import { Component, OnInit } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { InitialViewService } from "../initial-view.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {

  public constructor(public initialViewService: InitialViewService) { }
  public title = "Spot the Differences";
  public button = "Accept";
  public verifyUsername(): void {
    const username: string = (<HTMLInputElement>document.getElementById("usernameInput")).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  public correctUsername(message: Message): void {
    // TODO
  }

  public ngOnInit() {
  }
}
