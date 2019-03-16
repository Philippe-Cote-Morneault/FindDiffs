import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
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
    private static readonly MAX_QTE: number = 201;
    private static readonly MIN_QTE: number = 9;

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
        ) {
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
       const gameName: string = this.gameNameInput.nativeElement.value;
       const validationRegex: string = "^[a-zA-Z0-9]{3,12}$";
       const nameValidationRegex: RegExp = new RegExp(validationRegex);

       return nameValidationRegex.test(gameName);
    }

    public isModificationTypeValid(): boolean {
        const isAddType: boolean = this.add.nativeElement.checked;
        const isRemoveType: boolean = this.remove.nativeElement.checked;
        const isModifiedType: boolean = this.modified.nativeElement.checked;

        return isAddType || isRemoveType || isModifiedType;
    }

    public isQuantityValid(): boolean {
        const quantity: number = Number(this.quantityObject.nativeElement.value);

        return !isNaN(quantity) && quantity > CreateGameFreeViewComponent.MIN_QTE && quantity < CreateGameFreeViewComponent.MAX_QTE;
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
            .subscribe((response: ICommonScene | Message) => {
                if ((response as Message).body) {
                    this.failedCreationHandler((response as Message).body);
                } else {
                    this.createThumbnail((response as ICommonScene), this.canvas.nativeElement);
                }
            });
    }

    private createThumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): void {
        const thumbnail: Blob = this.sceneCreationService.createTumbnail(scene, canvas);
        this.sceneService.addThumbnail(scene.id, thumbnail).subscribe((response: string | Message) => {
            if ((response as Message).body) {
                this.failedCreationHandler((response as Message).body);
            } else {
                this.createModifiedScene(scene.id);
            }
        })

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
