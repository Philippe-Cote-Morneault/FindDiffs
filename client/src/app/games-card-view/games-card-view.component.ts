import { Component, OnInit, Input } from '@angular/core';
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

  public constructor() {}

  ngOnInit() {
  }

}
