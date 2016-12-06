import { Injectable } from '@angular/core'
import {CanActivate, Router, ActivatedRouteSnapshot,
  RouterStateSnapshot} from '@angular/router'
import {select, NgRedux} from "ng2-redux/lib/index"
import {Observable} from "rxjs/Rx"
import {IAppState} from "../store/index";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private redux:NgRedux<IAppState>,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(!this.checkLogin(url)){
      this.router.navigate(['/login']);
    }
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    const { auth } = this.redux.getState();
    return auth.isLoggedIn
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;
    // this.router.navigate(['/login']);
  }

}
