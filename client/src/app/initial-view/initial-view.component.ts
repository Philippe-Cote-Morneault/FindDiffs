import { Component, OnInit } from '@angular/core';
import { InitialViewService } from '../initial-view.service';
import { Message } from '../../../../common/communication/message';
@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit {

  constructor(public initialViewService : InitialViewService) { }
  title = 'Spot the Differences';
  button = 'Accept';
  public verifyUsername(): void {
    let username:string = (<HTMLInputElement>document.getElementById("usernameInput")).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  public correctUsername(message:Message): void{
    console.log(message);
  }
  ngOnInit() {
  }

}
