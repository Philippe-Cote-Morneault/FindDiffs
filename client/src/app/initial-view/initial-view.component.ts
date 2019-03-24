import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ICommonError } from "../../../../common/communication/webSocket/error";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonToken } from "../../../../common/communication/webSocket/token";
import { ICommonUser } from "../../../../common/communication/webSocket/user";
import { SocketHandlerService } from "../services/socket/socketHandler.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private static readonly enterKeyCode: number = 13;

    @ViewChild("usernameInput") private usernameInput: ElementRef;

    public constructor(private router: Router,
                       private socketHandlerService: SocketHandlerService) {
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
        const user: ICommonUser = {
            username: username,
        };
        const message: ICommonSocketMessage = {
            data: user,
            timestamp: new Date(),
        };
        this.socketHandlerService.socket.emit(Event.NewUser, message, (response: ICommonToken | ICommonError) => {
            if ((response as ICommonToken).token) {
                sessionStorage.setItem("user", username);
                this.router.navigateByUrl("/gamesList");
            } else {
                alert((response as ICommonError).error_message);
            }
        });
    }
}
