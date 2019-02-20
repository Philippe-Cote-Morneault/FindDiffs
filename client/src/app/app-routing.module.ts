import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { GameViewComponent } from "./game-view/game-view.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
// import { InitialViewComponent } from "./initial-view/initial-view.component";
import { TestComponent } from "./test/test.component";

const routes: Routes = [
    // { path: "", component: InitialViewComponent },
    { path: "", component: TestComponent },
    { path: "admin", component: AdminViewComponent },
    { path: "gamesList", component: GamesListViewComponent },
    { path: "game/:id", component: GameViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})
export class AppRoutingModule { }
