import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InitialViewService } from "./initial-view.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { SoloGameCreatorComponent } from "./solo-game-creator/solo-game-creator.component";

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
    SoloGameCreatorComponent,
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
