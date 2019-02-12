import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-view",
    templateUrl: "./admin-view.component.html",
    styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent {
    public isCreatingGameSimpleMode: boolean = false;
    public isCreatingGameFreeMode: boolean = false;

    public constructor(private router: Router) {}

    public onClosed(closed: boolean): void {
        if (closed) {
            this.isCreatingGameSimpleMode = false;
            this.isCreatingGameFreeMode = false;
        }
    }

    public leaveAdminMode(): void {
        this.router.navigateByUrl("/gamesList");
    }
}
