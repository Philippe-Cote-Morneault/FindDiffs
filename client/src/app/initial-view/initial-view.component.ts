import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonUser } from "../../../../common/model/user";
import { SocketHandler } from "../services/socket/socketHandler";
import { UserService } from "../services/user/user.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private static enterKeyCode: number = 13;

    @ViewChild("usernameInput") private usernameInput: ElementRef;

    public constructor(public userService: UserService, private router: Router, private socketHandler: SocketHandler) {
    }

    public ngOnInit(): void {
        // tslint:disable-next-line:no-any
        this.usernameInput.nativeElement.addEventListener("keyup", (event: any) => {
            event.preventDefault();
            if (event.keyCode === InitialViewComponent.enterKeyCode) {
              this.verifyUsername();
            }
          });
    }

    public verifyUsername(): void {
        const username: string = this.usernameInput.nativeElement.value;
        this.userService.postUsernameValidation(username).subscribe(this.correctUsername.bind(this));
    }

    public async correctUsername(response: ICommonUser | Message): Promise<void> {
        if ((response as ICommonUser).id) {
            this.socketHandler.notifyNewUser((response as ICommonUser).username);
            localStorage.setItem("user", JSON.stringify(response));
            await this.router.navigateByUrl("/gamesList");
        } else {
            alert((response as Message).body);
        }
    }
}
