import { Component,  ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ScenePairService } from "../services/scene-pair.service";

@Component({
    selector: "app-create-game-free-view",
    templateUrl: "./create-game-free-view.component.html",
    styleUrls: ["./create-game-free-view.component.css"],
})
export class CreateGameFreeViewComponent {
    @Output() public closed: EventEmitter<boolean> = new EventEmitter();
    @ViewChild("gameNameInput") private gameNameInput: ElementRef;
    @ViewChild("add") private add: ElementRef;
    @ViewChild("remove") private remove: ElementRef;
    @ViewChild("modified") private modified: ElementRef;
    @ViewChild("quantityObject") private quantityObject: ElementRef;
    @ViewChild("erreurMessage") private erreurMessage: ElementRef;
    @ViewChild("objectType") private objectType: ElementRef;

    public canSubmit: boolean;
    public displayError: string;
    public hideError: string;
    public MAX_QTE: number;
    public MIN_QTE: Number;

    public constructor (private spinnerService: Ng4LoadingSpinnerService, public scenePairService: ScenePairService) {
        this.displayError = "inline";
        this.hideError = "none";
        this.canSubmit = false;
        // tslint:disable:no-magic-numbers
        this.MAX_QTE = 200;
        this.MIN_QTE = 10;
    }
    public isNameValid(): boolean {
        const gameName: string = this.gameNameInput.nativeElement.value;

        return gameName.length !== 0;
    }
    public isModificationTypeValid(): boolean {
        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;

        return isAddType || isRemoveType || isModifiedType;
    }
    public isQuantityValid(): boolean {
        const quantity: number = Number(this.quantityObject.nativeElement.value);
        this.toggleErrorMessage(quantity);

        return !isNaN(quantity) && quantity > this.MIN_QTE && quantity < this.MAX_QTE;
    }

    private toggleErrorMessage(quantity: number): void {
        this.erreurMessage.nativeElement.style.display = ((isNaN(quantity) || (quantity < this.MIN_QTE || quantity > this.MAX_QTE))
                                                           && quantity !== 0)
        ? this.displayError : this.hideError;
    }

    public verifyInfo(): void {
        this.canSubmit = (this.isNameValid() && this.isQuantityValid() && this.isModificationTypeValid());
    }

    public hideView(): void {
        this.closed.emit(true);
    }

    public addScenePair(): void {
        this.spinnerService.show();
        const gameName: string = this.gameNameInput.nativeElement.value;
        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;
        const quantity: string = this.quantityObject.nativeElement.value;
        const objectType: string = this.objectType.nativeElement.value;

        // TODO: Subscribe
        this.scenePairService.addScenePair(gameName, objectType, Number(quantity), isAddType, isRemoveType, isModifiedType).subscribe();
    }
}
