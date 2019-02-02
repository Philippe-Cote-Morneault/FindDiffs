import { Component, OnInit } from "@angular/core";
import { SocketService } from "./services/socket.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
   public constructor(private socket: SocketService) { }

   public message: string;

   public ngOnInit(): void {
     this.socket.ngOnInit();
    }
}
