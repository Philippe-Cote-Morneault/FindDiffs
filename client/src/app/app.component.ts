import { Component, OnInit } from "@angular/core";
// import { Message } from "../../../common/communication/message";
import { SocketService } from "./socket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private socket: SocketService) { }

    public message: string;

    public ngOnInit(): void {
        // this.basicService.basicGet().subscribe((message: Message) => this.message = message.title + message.body);
        this.socket.ngOnInit();
        console.log("initialization of socket; the call has been made in app.component.ts");
    }
}
