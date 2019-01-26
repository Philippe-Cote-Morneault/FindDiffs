import { Component, OnInit } from "@angular/core";
import { GameCard, POVType } from "../gameCard";
import { GameCardsService } from "../game-cards.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"],
})
export class GamesListViewComponent implements OnInit {
  public simplePOVgames: GameCard[];
  public freePOVgames: GameCard[];

  public constructor(public gameCardsService: GameCardsService) { 
    /*
    this.games = [{title: "Hello", image: "image1", bestTimeSolo: [1, 2, 3], bestTimeOnline: [4, 5, 6]},
             {title: "Hello2", image: "image2", bestTimeSolo: [11, 22, 33], bestTimeOnline: [44, 55, 66]}];
*/
    this.gameCardsService.getGameCards(POVType.Simple).subscribe((cards) => {
      this.simplePOVgames = cards;
    });

    this.gameCardsService.getGameCards(POVType.Free).subscribe((cards) => {
      this.freePOVgames = cards;
    });

  }

  ngOnInit() {
  }

}
