import { Component, OnInit } from '@angular/core';
import { GamesCardViewService } from '../games-card-view.service';

@Component({
  selector: 'app-games-card-view',
  templateUrl: './games-card-view.component.html',
  styleUrls: ['./games-card-view.component.css']
})
export class GamesCardViewComponent implements OnInit {

  constructor(public GamesCardViewService : GamesCardViewService) { }
  gameTitle = 'gameTitle';
  image = 'image';
  

  ngOnInit() {
  }

}
