import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-view",
    templateUrl: "./admin-view.component.html",
    styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent {
    public isCreatingGameSimpleMode: boolean;
    public isCreatingGameFreeMode: boolean;

    public constructor(private router: Router) {
        this.isCreatingGameSimpleMode = false;
        this.isCreatingGameFreeMode = false;
    }

    public onClosed(closed: boolean): void {
        if (closed) {
            this.isCreatingGameSimpleMode = false;
            this.isCreatingGameFreeMode = false;
        }
    }

    public async leaveAdminMode(): Promise<void> {
        await this.router.navigateByUrl("/gamesList");
    }
}
