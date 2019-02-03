import { Component, HostListener, OnInit } from "@angular/core";
import { ICommonUser } from "./../../../common/model/user";
import { SocketService } from "./services/socket.service";
import { UserService } from "./services/user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private socket: SocketService, private userService: UserService) {}

    public message: string;

    public ngOnInit(): void {
        this.socket.ngOnInit();
    }
    @HostListener("window:beforeunload", ["$event"])
    public async beforeUnload($event: Event): Promise<void> {
        const user: ICommonUser = JSON.parse(localStorage.getItem("user") || "{}");
        await this.userService.deleteUsername(user.id).toPromise();
    }
}
