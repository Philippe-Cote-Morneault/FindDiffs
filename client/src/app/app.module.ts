import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InitialViewService } from "./initial-view.service";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from './initial-view/initial-view.component';
import { GamesListViewComponent } from './games-list-view/games-list-view.component';
import { GamesCardViewComponent } from './games-card-view/games-card-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    GamesListViewComponent,
    GamesCardViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InitialViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
