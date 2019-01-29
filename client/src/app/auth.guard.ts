import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { InitialViewComponent } from "./initial-view/initial-view.component";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  public constructor(private initialViewComponent: InitialViewComponent) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.initialViewComponent.isLogged;
  }
}
