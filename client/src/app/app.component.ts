import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ICommonUser } from "./../../../common/model/user";
import { SocketService } from "./services/socket.service";
import { UserService } from "./services/user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private socket: SocketService, private userService: UserService, private router: Router) {}

    public message: string;

    public ngOnInit(): void {
        this.socket.ngOnInit();
    }
    @HostListener("window:beforeunload", ["$event"])
    public beforeUnload($event: Event): void {
        this.router.navigateByUrl("/");
        const user: ICommonUser = JSON.parse(localStorage.getItem("user") || "{}");
        this.userService.deleteUsername(user.id).toPromise();
    }
}
