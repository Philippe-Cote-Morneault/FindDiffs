import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { FormVerificationFreePOVService } from "../services/createGame/formVerificationFreePOV.service";
import { GameCardLoaderService } from "../services/gameCard/game-card-loader.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneCreationService } from "../services/scene/sceneCreation/scene-creation.service";

@Component({
    selector: "app-create-game-free-view",
    templateUrl: "./create-game-free-view.component.html",
    styleUrls: ["./create-game-free-view.component.css"],
})
export class CreateGameFreeViewComponent {
    @Output() public closed: EventEmitter<boolean>;
    @ViewChild("gameNameInput") private gameNameInput: ElementRef;
    @ViewChild("add") private add: ElementRef;
    @ViewChild("remove") private remove: ElementRef;
    @ViewChild("modified") private modified: ElementRef;
    @ViewChild("quantityObject") private quantityObject: ElementRef;
    @ViewChild("objectType") private objectType: ElementRef;
    @ViewChild("renderingCanvas") private canvas: ElementRef;

    public canSubmit: boolean;
    public firstNameInput: boolean;
    public firstQuantityInput: boolean;

    public constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        public gamesCardService: GamesCardService,
        private gameCardLoaderService: GameCardLoaderService,
        private sceneCreationService: SceneCreationService,
        public formVerificationFreePOVService: FormVerificationFreePOVService) {
            this.canSubmit = false;
            this.firstNameInput = false;
            this.firstQuantityInput = false;
            this.closed = new EventEmitter();
    }

    public nameInputVisited(): void {
        this.firstNameInput = true;
    }

    public quantityInputVisited(): void {
        this.firstQuantityInput = true;
    }

    public isNameValid(): boolean {
       return this.formVerificationFreePOVService.isNameValid(this.gameNameInput.nativeElement.value);
    }

    public isModificationTypeValid(): boolean {
        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;

        return this.formVerificationFreePOVService.isModificationTypeValid(isAddType, isRemoveType, isModifiedType);
    }

    public isQuantityValid(): boolean {

        return this.formVerificationFreePOVService.isQuantityValid(Number(this.quantityObject.nativeElement.value));
    }

    public verifyInfo(): void {
        this.canSubmit = (this.isNameValid() && this.isQuantityValid() && this.isModificationTypeValid());
    }

    public hideView(): void {
        this.closed.emit(true);
    }

    public addScenePair(): void {
        this.spinnerService.show();
        const quantity: string = this.quantityObject.nativeElement.value;
        const objectType: string = this.objectType.nativeElement.value;

        this.sceneService.createScene(objectType, Number(quantity))
            .subscribe(async (response: ICommonScene | Message) => {
                if ((response as Message).body) {
                    this.failedCreationHandler((response as Message).body);
                } else {
                    await this.createThumbnail((response as ICommonScene), this.canvas.nativeElement);
                }
            });
    }

    private async createThumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): Promise<void> {
        const thumbnail: Blob = await this.sceneCreationService.createTumbnail(scene, canvas);
        this.sceneService.addThumbnail(scene.id, thumbnail).subscribe((response: string | Message) => {
            if ((response as Message).body) {
                this.failedCreationHandler((response as Message).body);
            } else {
                this.createModifiedScene(scene.id);
            }
        });

    }

    private createModifiedScene(sceneId: string): void {

        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;

        this.sceneService.createModifiedScene(sceneId, isAddType, isRemoveType, isModifiedType)
            .subscribe((response: ICommonSceneModifications | Message) => {
                if ((response as Message).body) {
                    this.failedCreationHandler((response as Message).body);
                } else {
                    this.addGameCard(sceneId);
                }
            });
        }

    private addGameCard(ressourceId: string): void {
        const gameName: string = this.gameNameInput.nativeElement.value;

        this.gamesCardService.addGameCard(gameName, ressourceId, POVType.Free)
            .subscribe((response: ICommonGameCard | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    this.hideView();
                    this.gameCardLoaderService.addDynamicComponent((response as ICommonGameCard), true);
                    this.spinnerService.hide();
                    alert("Free pov game created!");
                }
            });
    }

    private failedCreationHandler(message: string): void {
        alert(message);
        this.hideView();
    }
}
