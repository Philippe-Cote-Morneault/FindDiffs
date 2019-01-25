import { Component, OnInit } from "@angular/core";
import { GameCard } from "../gameCard";
import { GamesListViewService } from "../games-list-view.service";

@Component({
  selector: "app-games-list-view",
  templateUrl: "./games-list-view.component.html",
  styleUrls: ["./games-list-view.component.css"]
})
export class GamesListViewComponent implements OnInit {
  public games: GameCard[];

  public constructor(public gamesListViewService: GamesListViewService) { 
    this.games = [{title: "Hello", image: "image1", bestTimeSolo: [1, 2, 3], bestTimeOnline: [4, 5, 6]},
             {title: "Hello2", image: "image2", bestTimeSolo: [11, 22, 33], bestTimeOnline: [44, 55, 66]}];

    console.log("Games size = " + this.games.length);
  }

  ngOnInit() {
  }

}
