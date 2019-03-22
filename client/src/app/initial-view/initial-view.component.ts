import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonUser } from "../../../../common/model/user";
import { SocketHandlerService } from "../services/socket/socketHandler.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private static readonly enterKeyCode: number = 13;

    @ViewChild("usernameInput") private usernameInput: ElementRef;

    public constructor(private router: Router, private socketHandlerService: SocketHandlerService) {
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

    public async verifyUsername(): Promise<void> {
        const username: string = this.usernameInput.nativeElement.value;
        this.socketHandlerService.sendNewUser(username);
        await this.router.navigateByUrl("/gamesList");
        //this.userService.postUsernameValidation(username).subscribe(this.correctUsername.bind(this));
        //SocketHandlerService.getInstance().socket.emit()
    }

    public async correctUsername(response: ICommonUser | Message): Promise<void> {
        if ((response as ICommonUser).id) {
            this.socketHandlerService.emitUser((response as ICommonUser).username);
            sessionStorage.setItem("user", JSON.stringify(response));
            await this.router.navigateByUrl("/gamesList");
        } else {
            alert((response as Message).body);
        }
    }
}
