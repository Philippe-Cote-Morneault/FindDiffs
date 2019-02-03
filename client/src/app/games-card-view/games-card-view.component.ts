import { Component, Input } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ImagePairService } from "../services/image-pair.service";

@Component({
  selector: "app-games-card-view",
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent {
  @Input() public gameCard: ICommonGameCard;
  public constructor(public imagePairService: ImagePairService) { }
  public buttonSolo: string = "Solo";
  public buttonOnline: string = "1 vs. 1";
  /*TODO: what to do
  public allo: string = this.gameCard.image_pair.id;

  private getOriginalImage(imagePairId: string): void {
    this.imagePairService.getOriginalImage(imagePairId).subscribe(
      () =>
    );
  }
  */

}
