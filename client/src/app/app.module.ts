import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateGameSimpleViewComponent } from "./create-game-simple-view/create-game-simple-view.component";
import { GamesCardViewComponent } from "./games-card-view/games-card-view.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { GameCardLoaderService } from "./services/game-card-loader.service";
import { InitialViewService } from "./services/initial-view.service";

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
    CreateGameSimpleViewComponent,
    GamesCardViewComponent,
    GamesListViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [InitialViewService, InitialViewComponent, GameCardLoaderService],
  bootstrap: [AppComponent],
  entryComponents: [GamesCardViewComponent],
})
export class AppModule { }
