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
  games : GameCard[]
  
  getGames() : void {
    this.GamesCardViewService.getGameCards()
      .subscribe(games => this.games = games);
  }

  game = new GameCard('name', 'img', [1,1,1], [1,1,1]);
  
  constructor(public GamesCardViewService : GamesCardViewService) { }

  ngOnInit() {
  }

}
