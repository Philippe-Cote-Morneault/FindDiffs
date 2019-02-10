import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-create-game-free-view",
    templateUrl: "./create-game-free-view.component.html",
    styleUrls: ["./create-game-free-view.component.css"],
})
export class CreateGameFreeViewComponent {
    @Output() public closed: EventEmitter<boolean> = new EventEmitter();

    public canSubmit: boolean = false;
    public displayError: string = "inline";
    public hideError: string = "none";

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
        this.toggleErrorMessage(quantity);

        return quantity.length !== 0 && !isNaN(Number(quantity));
    }

    private toggleErrorMessage(quantity: string): void {
        (document.getElementById("erreurMessage") as HTMLElement).style.display = (quantity.length > 0 && isNaN(Number(quantity)))
        ? this.displayError : this.hideError;
    }

    public verifyInfo(): void {
        this.canSubmit = (this.isQuantityValid() && this.isNameValid() && this.isModificationTypeValid());
    }

    public hideView(): void {
        this.closed.emit(true);
    }
}
