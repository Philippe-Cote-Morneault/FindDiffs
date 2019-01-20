import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  simpleMode = 'Simple mode';
  freeMode = 'Free mode';
  header = 'Create a game in:';
  constructor() {}
  ngOnInit() {
  }

}
