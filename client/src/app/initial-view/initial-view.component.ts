import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../../../common/communication/user";
import { Message } from "../../../../common/communication/message";
import { InitialViewService } from "../initial-view.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

    public constructor(public initialViewService: InitialViewService, private router: Router) {
        this.router.navigateByUrl("/");
     }
    public title: string = "Spot the Differences";
    public button: string = "Accept";

    public verifyUsername(): void {
        const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
        this.initialViewService.postUsernameValidation(username).subscribe(this.correctUsername.bind(this));
    }

    @HostListener("window:beforeunload", ["$event"])
    public beforeUnload($event: Event): void {
        const user: User = JSON.parse(localStorage.getItem("user") || "{}");
        this.initialViewService.deleteUsername(user.id).toPromise();
    }

    public correctUsername(response: User | Message): void {
        if ((response as User).id) {
            localStorage.setItem("user", JSON.stringify(response));
            this.router.navigateByUrl("/admin");
        } else {
            alert((response as Message).body);
        }
    }
}
