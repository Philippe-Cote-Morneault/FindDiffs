import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { ToastrModule } from "ngx-toastr";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateGameFreeViewComponent } from "./create-game-free-view/create-game-free-view.component";
import { CreateGameSimpleViewComponent } from "./create-game-simple-view/create-game-simple-view.component";
import { EndMultiplayerGameComponent } from "./end-multiplayer-game/end-multiplayer-game.component";
import { EndSoloGameComponent } from "./end-solo-game/end-solo-game.component";
import { GameViewFreeComponent } from "./game-view-free/game-view-free.component";
import { GameViewSimpleComponent } from "./game-view-simple/game-view-simple.component";
import { GamesCardViewComponent } from "./games-card-view/games-card-view.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { GameCardLoaderService } from "./services/gameCard/gameCardLoader.service";

@NgModule({
    declarations: [
        AppComponent,
        InitialViewComponent,
        AdminViewComponent,
        CreateGameSimpleViewComponent,
        GamesCardViewComponent,
        GamesListViewComponent,
        GameViewSimpleComponent,
        CreateGameFreeViewComponent,
        GameViewFreeComponent,
        EndSoloGameComponent,
        EndMultiplayerGameComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        Ng4LoadingSpinnerModule.forRoot(),
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [InitialViewComponent, GameCardLoaderService],
    bootstrap: [AppComponent],
    entryComponents: [GamesCardViewComponent],
})
export class AppModule { }
