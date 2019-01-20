import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InitialViewService } from "./initial-view.service";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from './initial-view/initial-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [InitialViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
