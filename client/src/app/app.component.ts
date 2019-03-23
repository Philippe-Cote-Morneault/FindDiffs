import { Component, HostListener } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {

    @HostListener("window:beforeunload", ["$event"])
    public async beforeUnload($event: Event): Promise<void> {
        //const user: ICommonUser = JSON.parse(localStorage.getItem("user") || "{}");
    }
}
