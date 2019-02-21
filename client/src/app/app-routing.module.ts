import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { GameViewFreeComponent } from "./game-view-free/game-view-free.component";
import { GameViewSimpleComponent } from "./game-view-simple/game-view-simple.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
//import { TestComponent } from "./test/test.component";

const routes: Routes = [
    { path: "", component: InitialViewComponent },
    // { path: "", component: TestComponent },
    { path: "admin", component: AdminViewComponent },
    { path: "gamesList", component: GamesListViewComponent },
    { path: "gameSimple/:id", component: GameViewSimpleComponent },
    { path: "gameFree/:id", component: GameViewFreeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})
export class AppRoutingModule { }
