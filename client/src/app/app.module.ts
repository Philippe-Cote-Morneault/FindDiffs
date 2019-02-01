import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { AuthGuard } from "./auth.guard";
import { CreateGameSimpleViewComponent } from "./create-game-simple-view/create-game-simple-view.component";
import { InitialViewService } from "./initial-view.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";

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
    FormsModule,
  ],
  providers: [InitialViewService],
  bootstrap: [AppComponent],
})
export class AppModule { }
