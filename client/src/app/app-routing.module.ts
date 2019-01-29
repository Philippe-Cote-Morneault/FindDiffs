// import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AuthGuard } from "./auth.guard";
import { InitialViewComponent } from "./initial-view/initial-view.component";

const routes: Routes = [
  { path: "initialView", component: InitialViewComponent},
  { path: "admin", component: AdminViewComponent, canActivate: [AuthGuard]},
  { path: "admin", component: AdminViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
