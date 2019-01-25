import { Component, OnInit } from '@angular/core';
import { GamesCardViewService } from '../games-card-view.service';
import { GameCard } from '../gameCard';

@Component({
  selector: 'app-games-card-view',
  templateUrl: './games-card-view.component.html',
  styleUrls: ['./games-card-view.component.css']
})
export class GamesCardViewComponent implements OnInit {
  buttonSolo = 'Solo';
  buttonOnline = '1 vs. 1';

  gameTest: GameCard = {
    title: 'testtitle',
    image: 'testimg',
    bestTimeSolo: [111, 111, 111],
    bestTimeOnline: [222, 222, 222]
  };

  games : GameCard[] = [
    this.gameTest
  ];
  

  getGameCards() : void {
    this.GamesCardViewService.getGameCards()
      .subscribe(games => this.games = games);
  }
  
  constructor(public GamesCardViewService : GamesCardViewService) { }

  ngOnInit() {
  }

}
