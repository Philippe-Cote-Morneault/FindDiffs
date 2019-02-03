import { Component } from "@angular/core";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent {
  public isPopUpVisible: boolean = false;
  public simpleMode: string = "Simple mode";
  public freeMode: string = "Free mode";
  public header: string = "Create a game in:";

}
