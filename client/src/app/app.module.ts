import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// import { RouterModule } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { AuthGuard } from "./auth.guard";
import { InitialViewService } from "./initial-view.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { CreateGameSimpleViewComponent } from './create-game-simple-view/create-game-simple-view/create-game-simple-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
    CreateGameSimpleViewComponent,
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
