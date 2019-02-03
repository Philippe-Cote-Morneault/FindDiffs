import { Component, Input, OnInit } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ImagePairService } from "../services/image-pair.service";

@Component({
  selector: "app-games-card-view",
  providers: [ImagePairService],
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent implements OnInit {
  @Input() public gameCard: ICommonGameCard;
  public buttonSolo: string = "Solo";
  public buttonOnline: string = "1 vs. 1";
  public originalImage: File;

  public constructor(public imagePairService: ImagePairService) { }

  public ngOnInit(): void {
    this.getOriginalImage();
  }

  private getOriginalImage(): void {
    this.imagePairService.getOriginalImage(this.gameCard.image_pair.id).subscribe(
      (originalImage: File) => {this.originalImage = originalImage; },
    );
  }
}
