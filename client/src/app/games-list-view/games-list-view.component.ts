import { Component, OnInit } from '@angular/core';
import { GamesListViewService } from '../games-list-view.service';

@Component({
  selector: "app-games-list-view",
  templateUrl: './games-list-view.component.html',
  styleUrls: ['./games-list-view.component.css']
})
export class GamesListViewComponent implements OnInit {

  constructor(public GamesListView : GamesListViewService) { }

  ngOnInit() {
  }

}
