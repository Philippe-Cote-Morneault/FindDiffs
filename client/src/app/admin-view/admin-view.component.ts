import { Component } from "@angular/core";

@Component({
    selector: "app-admin-view",
    templateUrl: "./admin-view.component.html",
    styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent {
    public isCreatingGameSimpleMode: boolean = false;
    public isCreatingGameFreeMode: boolean = false;

    public onClosed(closed: boolean): void {
        if (closed) {
            this.isCreatingGameSimpleMode = false;
            this.isCreatingGameFreeMode = false;
        }
    }
}
