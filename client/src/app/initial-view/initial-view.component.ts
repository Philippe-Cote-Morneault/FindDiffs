import { Component, OnInit } from '@angular/core';
import { InitialViewService } from '../initial-view.service';
import { Message } from '../../../../common/communication/message';
import { HostListener } from '@angular/core'
@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit {

  constructor(public initialViewService : InitialViewService) { }
  title = 'Spot the Differences';
  button = 'Accept';
  user = "" ;
  public verifyUsername(): void {
    let username:string = (<HTMLInputElement>document.getElementById("usernameInput")).value;
    this.initialViewService.getUsernameValidation(username).subscribe(this.correctUsername);
  }

  @HostListener('window:beforeunload') beforeUnloadHander() {
    this.initialViewService.deleteUsername(this.user).subscribe();
  }
  public correctUsername(message:Message): void{
    this.user = message.body;
  }
  ngOnInit() {
  }

}
