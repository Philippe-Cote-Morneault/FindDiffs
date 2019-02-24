import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { HTMLInputEvent } from "../htmlinput-event";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { ImagePairService } from "../services/image-pair/image-pair.service";

@Component({
    selector: "app-create-game-simple-view",
    templateUrl: "./create-game-simple-view.component.html",
    styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent {
    @Output() public closed: EventEmitter<boolean>;
    @ViewChild("gameNameInput") private gameNameInput: ElementRef;

    public canSubmit: boolean;
    public fromValidation: boolean[];

    private originalImageFile: File;
    private modifiedImageFile: File;
    private gameName: string;
    public firstNameInput: boolean;
    public firstOriginalImageInput: boolean;
    public firstModifiedImageInput: boolean;

    public constructor(private gamesCardService: GamesCardService, private imagePairService: ImagePairService,
                       private spinnerService: Ng4LoadingSpinnerService) {
        this.canSubmit = false;
        this.fromValidation = [false, false, false, false, false];
        this.closed = new EventEmitter();
        this.firstNameInput = false;
        this.firstOriginalImageInput = false;
        this.firstModifiedImageInput = false;
    }

    public isNameValid(): boolean {

        if (this.firstNameInput) {
            const gameName: string = this.gameNameInput.nativeElement.value;

            const validationRegex: string = "^[a-zA-Z0-9]{3,12}$";
            const nameValidationRegex: RegExp = new RegExp(validationRegex);
            this.fromValidation[0] = nameValidationRegex.test(gameName);
            this.gameName = gameName;

            return this.fromValidation[0];
        }

        return true;
    }

    public isOriginalFileValid(): boolean {
        const ORIGINAL_FIELD: number = 4;
        if (this.firstOriginalImageInput) {
            return this.fromValidation[ORIGINAL_FIELD];
        }

        return true;
    }

    public isModifiedFileValid(): boolean {
        const MODIFIED_FIELD: number = 4;
        if (this.firstModifiedImageInput) {
            return this.fromValidation[MODIFIED_FIELD];
        }

        return true;
    }

    public nameInputVisited(): void {
        this.firstNameInput = true;
    }

    public originalImageVisited(): void {
        this.firstOriginalImageInput = true;
    }

    public modifiedImageVisited(): void {
        this.firstModifiedImageInput = true;
    }

    public fileEvent(event: HTMLInputEvent, fileId: number): void {
        if (event.target.files != null) {
            const files: FileList = event.target.files;
            const fileName: string = files[0].name;
            const IMAGE_WIDTH: number = 640;
            const IMAGE_HEIGHT: number = 480;
            const VALIDATION_MODIFIER: number = 2;

            const url: string = window.URL.createObjectURL(files[0]);
            const img: HTMLImageElement = new Image();

            img.onload = () => {
                this.fromValidation[VALIDATION_MODIFIER + fileId] =
                    (img.naturalWidth === IMAGE_WIDTH && img.naturalHeight === IMAGE_HEIGHT);
            };

            img.src = url;
            this.fromValidation[fileId] = fileName.split(".")[1] === "bmp";

            fileId === 1 ? this.originalImageFile = event.target.files[0] : this.modifiedImageFile = event.target.files[0];
        }
    }

    public verifyInfo(): void {
        const allEqual: boolean = this.fromValidation.every((value) => value);
        this.canSubmit = allEqual;
    }

    public addImagePair(): void {
        this.spinnerService.show();
        this.imagePairService.addImagePair(this.gameName, this.originalImageFile, this.modifiedImageFile)
            .subscribe((response: ICommonImagePair | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    this.addGameCard((response as ICommonImagePair).id);
                }
            });
    }

    private addGameCard(imagePairId: string): void {
        this.gamesCardService.addGameCard(this.gameName, imagePairId, POVType.Simple)
            .subscribe((response: ICommonGameCard | Message) => {
                if ((response as Message).body) {
                    alert((response as Message).body);
                } else {
                    window.location.reload();
                }
            });
    }

    public hideView(): void {
        this.spinnerService.hide();
        this.closed.emit(true);
    }
}
