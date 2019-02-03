import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./../../../common/communication/user";
import { InitialViewService } from "./services/initial-view.service";
import { SocketService } from "./services/socket.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private socket: SocketService, private initialViewService: InitialViewService, private router: Router) {
        this.router.navigateByUrl("/");
    }

    public message: string;

    public ngOnInit(): void {
        this.socket.ngOnInit();
    }
    @HostListener("window:beforeunload", ["$event"])
    public beforeUnload($event: Event): void {
        const user: User = JSON.parse(localStorage.getItem("user") || "{}");
        this.initialViewService.deleteUsername(user.id).toPromise();
    }
}
