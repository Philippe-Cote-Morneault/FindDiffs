import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";

const routes: Routes = [
  { path: "", component: InitialViewComponent},
  { path: "initilView", component: InitialViewComponent},
  { path: "admin", component: AdminViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
