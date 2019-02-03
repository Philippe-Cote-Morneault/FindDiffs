import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonUser } from "../../../../common/model/user";
import { UserService } from "../services/user.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent {

    public constructor(public userService: UserService, private router: Router) {}
    public title: string = "Spot the Differences";
    public button: string = "Accept";

    public verifyUsername(): void {
        const username: string = (document.getElementById("usernameInput") as HTMLInputElement).value;
        this.userService.postUsernameValidation(username).subscribe(this.correctUsername.bind(this));
    }

    public async correctUsername(response: ICommonUser | Message): Promise<void> {
        if ((response as ICommonUser).id) {
            localStorage.setItem("user", JSON.stringify(response));
            await this.router.navigateByUrl("/gamesList");
        } else {
            alert((response as Message).body);
        }
    }
}
