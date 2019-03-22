import { Component, HostListener } from "@angular/core";
import { SocketHandlerService } from "./services/socket/socketHandler.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [SocketHandlerService]
})
export class AppComponent {
    public constructor(private socketHandlerService: SocketHandlerService) {
        console.log(this.socketHandlerService.id);
    }

    @HostListener("window:beforeunload", ["$event"])
    public async beforeUnload($event: Event): Promise<void> {
        //const user: ICommonUser = JSON.parse(localStorage.getItem("user") || "{}");
    }
}
