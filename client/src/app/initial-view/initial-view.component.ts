import { HostListener } from "@angular/core";
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
  public user = "" ;
  
  public verifyUsername(): void {
    const username: string = (<HTMLInputElement>document.getElementById("usernameInput")).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  @HostListener("window:beforeunload") beforeUnloadHander() {
    
    this.initialViewService.getDeleteUsername(this.user).subscribe();
  }
  public correctUsername(message: Message): void {
    // this.user = message.body;
    console.log(message);
  }
  public ngOnInit(): void { }
}
