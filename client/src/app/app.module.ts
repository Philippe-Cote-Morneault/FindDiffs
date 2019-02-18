import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateGameFreeViewComponent } from "./create-game-free-view/create-game-free-view.component";
import { CreateGameSimpleViewComponent } from "./create-game-simple-view/create-game-simple-view.component";
import { GameViewComponent } from "./game-view/game-view.component";
import { GamesCardViewComponent } from "./games-card-view/games-card-view.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { GameCardLoaderService } from "./services/game-card-loader.service";
import { UserService } from "./services/user.service";
import { TestComponent } from "./test/test.component";

@NgModule({
    declarations: [
        AppComponent,
        InitialViewComponent,
        AdminViewComponent,
        CreateGameSimpleViewComponent,
        GamesCardViewComponent,
        GamesListViewComponent,
        GameViewComponent,
        CreateGameFreeViewComponent,
        TestComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        Ng4LoadingSpinnerModule.forRoot(),
    ],
    providers: [UserService, InitialViewComponent, GameCardLoaderService],
    bootstrap: [AppComponent],
    entryComponents: [GamesCardViewComponent],
})
export class AppModule { }
