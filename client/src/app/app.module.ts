import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InitialViewService } from "./initial-view.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";

import { GamesCardViewComponent } from "./games-card-view/games-card-view.component";
import { GamesListViewComponent } from "./games-list-view/games-list-view.component";
@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [InitialViewService, InitialViewComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
