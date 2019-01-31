import { Component, Input } from "@angular/core";
import { ImagePair } from "../../../../common/communication/imagePair";

@Component({
  selector: "app-games-card-view",
  templateUrl: "./games-card-view.component.html",
  styleUrls: ["./games-card-view.component.css"],
})
export class GamesCardViewComponent {
  @Input() public imagePair: ImagePair;
  public buttonSolo: string = "Solo";
  public buttonOnline: string = "1 vs. 1";
}
