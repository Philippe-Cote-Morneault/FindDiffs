import { Component, Input, OnInit } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardService } from "../services/games-card.service";
import { Message } from "../../../../common/communication/message";

@Component({
  selector: "app-games-card-view",
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent implements OnInit {
  @Input() public gameCard: ICommonGameCard;
  @Input() public isInAdminView: boolean = false;

  public leftButton: string = "Play";
  public rightButton: string = "Create";

  private gamesCardService: GamesCardService;

  public constructor(gamesCardService: GamesCardService) {
    this.gamesCardService = gamesCardService;
  }

  public ngOnInit(): void {
    if (this.isInAdminView) {
      this.leftButton = "Delete";
      this.rightButton = "Reset";
    }
  }

  public onLeftButtonClick(): void {
    if (this.isInAdminView) {
      this.deleteGameCard();
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
        console.log(message);
        window.location.reload();
      });
    }
  }

  public resetBestTimes(): void {
    if (confirm("Are you sure you want to reset the best times of the Game Card called " + this.gameCard.title + "?")) {
      this.gamesCardService.resetBestTimes(this.gameCard).subscribe((message: Message) => {
        console.log(message);
        window.location.reload();
      });
    }
  }
}
