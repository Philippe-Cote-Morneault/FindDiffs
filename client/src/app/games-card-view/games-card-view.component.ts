import { Component, OnInit, Input } from '@angular/core';
//import { GamesCardViewService } from '../games-card-view.service';
import { GameCard } from '../gameCard';

@Component({
  selector: 'app-games-card-view',
  templateUrl: './games-card-view.component.html',
  styleUrls: ['./games-card-view.component.css']
})
export class GamesCardViewComponent implements OnInit {
  @Input() public gameCard: GameCard;
  buttonSolo = 'Solo';
  buttonOnline = '1 vs. 1';

  /*
  getGameCards() : void {
    this.GamesCardViewService.getGameCards()
      .subscribe(games => this.games = games);
  }
  */
  
  /*
  constructor(public GamesCardViewService : GamesCardViewService) {

   }
   */
  public constructor() {}

  ngOnInit() {
  }

}
