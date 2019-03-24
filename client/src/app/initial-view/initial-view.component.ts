import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { UserService } from "../services/user/user.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private static readonly enterKeyCode: number = 13;

    @ViewChild("usernameInput") private usernameInput: ElementRef;

    public constructor(private router: Router,
                       private socketHandlerService: SocketHandlerService,
                       private userService: UserService) {
    }

    public ngOnInit(): void {
        // tslint:disable-next-line:no-any
        this.usernameInput.nativeElement.addEventListener("keyup", (event: any) => {
            event.preventDefault();
            if (event.keyCode === InitialViewComponent.enterKeyCode) {
              this.verifyUsername();
            }
          });
        this.userService.setContainers(this.router);
    }

    public async verifyUsername(): Promise<void> {
        const username: string = this.usernameInput.nativeElement.value;
        this.socketHandlerService.emitUser(username);
    }
}
