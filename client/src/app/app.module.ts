import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InitialViewService } from "./initial-view.service";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from './initial-view/initial-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InitialViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
