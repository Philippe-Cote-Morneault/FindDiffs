import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent implements OnInit {
  public simpleMode = "Simple mode";
  public freeMode = "Free mode";
  public header = "Create a game in:";
  public constructor() {}
  public ngOnInit() {
  }
}
