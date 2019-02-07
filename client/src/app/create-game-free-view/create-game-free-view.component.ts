import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-create-game-free-view",
    templateUrl: "./create-game-free-view.component.html",
    styleUrls: ["./create-game-free-view.component.css"],
})
export class CreateGameFreeViewComponent implements OnInit {
    @Output() public closed: EventEmitter<boolean> = new EventEmitter();

    public canSubmit: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    public isNameValid(): boolean {
        const gameName: string = (document.getElementById("gameNameInput") as HTMLInputElement).value;

        return gameName.length !== 0;
    }
    public isModificationTypeValid(): boolean {
        const isAddType: boolean = (document.getElementById("add") as HTMLInputElement).checked;
        const isRemoveType: boolean = (document.getElementById("remove") as HTMLInputElement).checked;
        const isModifiedType: boolean = (document.getElementById("modified") as HTMLInputElement).checked;

        return isAddType || isRemoveType || isModifiedType;
    }
    public isQuantityValid(): boolean {
        const quantity: string = (document.getElementById("quantityObject") as HTMLInputElement).value;

        return quantity.length !== 0 && !isNaN(Number(quantity));
    }

    public verifyInfo(): void {
        this.canSubmit = (this.isNameValid() && this.isModificationTypeValid() && this.isQuantityValid());
    }

    public hideView(): void {
        this.closed.emit(true);
    }
}
