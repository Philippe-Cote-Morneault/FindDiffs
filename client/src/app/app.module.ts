import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { InitialViewService } from "./initial-view.service";
import { NgModule } from "@angular/core";

import { GamesCardViewComponent } from './games-card-view/games-card-view.component';
import { GamesListViewComponent } from './games-list-view/games-list-view.component';
@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    GamesListViewComponent,
    GamesCardViewComponent
    AdminViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [InitialViewService],
  bootstrap: [AppComponent],
})
export class AppModule { }
