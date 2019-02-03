import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { User } from "../../../../common/communication/user";
import { InitialViewService } from "../services/initial-view.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

    public constructor(public initialViewService: InitialViewService, private router: Router) {}
    public title: string = "Spot the Differences";
    public button: string = "Accept";

    public verifyUsername(): void {
        const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
        this.initialViewService.postUsernameValidation(username).subscribe(this.correctUsername.bind(this));
    }

    public correctUsername(response: User | Message): void {
        if ((response as User).id) {
            localStorage.setItem("user", JSON.stringify(response));
            this.router.navigateByUrl("/gamesList");
        } else {
            alert((response as Message).body);
        }
    }
}
