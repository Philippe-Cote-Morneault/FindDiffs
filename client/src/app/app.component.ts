import { Component, HostListener } from "@angular/core";
import { ICommonUser } from "./../../../common/model/user";
import { UserService } from "./services/user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public constructor(private userService: UserService) {}

    public message: string;

    @HostListener("window:beforeunload", ["$event"])
    public async beforeUnload($event: Event): Promise<void> {
        const user: ICommonUser = JSON.parse(localStorage.getItem("user") || "{}");
        await this.userService.deleteUsername(user.id).toPromise();
    }
}
