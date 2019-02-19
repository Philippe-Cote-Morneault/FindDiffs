import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";

@Component({
    selector: "app-create-game-free-view",
    templateUrl: "./create-game-free-view.component.html",
    styleUrls: ["./create-game-free-view.component.css"],
})
export class CreateGameFreeViewComponent {
    private static MAX_QTE: number = 200;
    private static MIN_QTE: number = 10;

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

    public constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        public gamesCardService: GamesCardService) {
        this.displayError = "inline";
        this.hideError = "none";
        this.canSubmit = false;
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

        return !isNaN(quantity) && quantity > CreateGameFreeViewComponent.MIN_QTE && quantity < CreateGameFreeViewComponent.MAX_QTE;
    }

    private toggleErrorMessage(quantity: number): void {
        this.erreurMessage.nativeElement.style.display = ((isNaN(quantity) ||
            (quantity < CreateGameFreeViewComponent.MIN_QTE || quantity > CreateGameFreeViewComponent.MAX_QTE)) && quantity !== 0)
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
        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;
        const quantity: string = this.quantityObject.nativeElement.value;
        const objectType: ObjectType = this.objectType.nativeElement.selectedIndex;
        const gameName: string = this.gameNameInput.nativeElement.value;

        this.sceneService.createScene(objectType, Number(quantity))
            .subscribe((response: ICommonScene | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    this.modifyScenePair((response as ICommonScene).id, gameName, isAddType, isRemoveType, isModifiedType);
                }
            });
    }

    public modifyScenePair(idScenePair: string, gameName: string, isAddType: boolean,
                           isRemoveType: boolean, isModifiedType: boolean): void {
        this.sceneService.createModifiedScene(idScenePair, isAddType, isRemoveType, isModifiedType)
            .subscribe((response: ICommonSceneModifications | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    this.addGameCard((response as ICommonSceneModifications).id, gameName);
                }
            });
        }

    private addGameCard(scenePairId: string, gameName: string): void {
        this.gamesCardService.addGameCard(gameName, scenePairId, POVType.Free)
            .subscribe((response: ICommonGameCard | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    window.location.reload();
                }
            });
    }
}
