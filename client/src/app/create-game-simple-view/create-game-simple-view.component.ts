import { Component,  ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { HTMLInputEvent } from "../htmlinput-event";
import { GamesCardService } from "../services/games-card.service";
import { ImagePairService } from "../services/image-pair.service";

@Component({
    selector: "app-create-game-simple-view",
    templateUrl: "./create-game-simple-view.component.html",
    styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent {
    @Output() public closed: EventEmitter<boolean> = new EventEmitter();
    @ViewChild("gameNameInput") private gameNameInput: ElementRef;

    private gamesCardService: GamesCardService;
    private imagePairService: ImagePairService;

    public canSubmit: boolean = false;
    public fromValidation: boolean[] = [false, false, false];

    private originalImageFile: File;
    private modifiedImageFile: File;
    private gameName: string;

    public constructor(gamesCardService: GamesCardService, imagePairService: ImagePairService,
                       private spinnerService: Ng4LoadingSpinnerService) {
        this.gamesCardService = gamesCardService;
        this.imagePairService = imagePairService;
    }

    public verifyName(): void {
        const MIN_LENGTH: number = 2;
        const MAX_LENGTH: number = 13;
        const gameName: string = this.gameNameInput.nativeElement.value;
        this.fromValidation[0] = gameName.length > MIN_LENGTH && gameName.length < MAX_LENGTH;
        this.gameName = gameName;
    }

    public fileEvent(event: HTMLInputEvent, fileId: number): void {
        if (event.target.files != null) {
            const fileName: string = event.target.files[0].name;
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
