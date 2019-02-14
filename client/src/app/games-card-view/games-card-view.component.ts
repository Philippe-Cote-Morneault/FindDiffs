import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { GamesCardService } from "../services/games-card.service";
import { ImagePairService } from "../services/image-pair.service";
import { StringFormater } from "../util/stringFormater";

@Component({
    selector: "app-games-card-view",
    templateUrl: "./games-card-view.component.html",
    styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent implements OnInit {
    @Input() public gameCard: ICommonGameCard;
    @Input() public isInAdminView: boolean = false;
    public imagePair: ICommonImagePair;

    public leftButton: string = "Play";
    public rightButton: string = "Create";

    public constructor(
        private gamesCardService: GamesCardService,
        private router: Router,
        private imagePairService: ImagePairService) { }

    public ngOnInit(): void {
        if (this.isInAdminView) {
            this.leftButton = "Delete";
            this.rightButton = "Reset";
        }
        this.getImagePairById();
    }

    public toMinutes(index: number, times: number[]): string {
        return StringFormater.secondsToMinutes(times[index]);
    }

    public async onLeftButtonClick(): Promise<void> {
        if (this.isInAdminView) {
            this.deleteGameCard();
        } else {
            await this.router.navigateByUrl("/game/" + this.gameCard.resource_id);
        }
    }

    public onRightButtonClick(): void {
        if (this.isInAdminView) {
            this.resetBestTimes();
        }
    }

    public deleteGameCard(): void {
        if (confirm("Are you sure you want to delete the Game Card called " + this.gameCard.title + "?")) {
            this.gamesCardService.deleteGameCard(this.gameCard.id).subscribe((message: Message) => {
                window.location.reload();
            });
        }
    }

    public resetBestTimes(): void {
        if (confirm("Are you sure you want to reset the best times of the Game Card called " + this.gameCard.title + "?")) {
            this.gamesCardService.resetBestTimes(this.gameCard).subscribe((message: Message) => {
                if (message.title !== "Error") {
                    window.location.reload();
                }
            });
        }
    }

    private getImagePairById(): void {
        this.imagePairService.getImagePairById(this.gameCard.resource_id).subscribe((imagePair: ICommonImagePair) => {
            this.imagePair = imagePair;
        });
    }
}
