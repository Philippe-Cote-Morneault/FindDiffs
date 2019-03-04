import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {

  public cheatActivated: boolean;
  public constructor() {
    this.cheatActivated = false;
  }

  public toggleCheats(): void {
    this.cheatActivated = !this.cheatActivated;
  }

  public toggleCheatMode(event: KeyboardEvent): void {
     alert("hourray");
  }

}
