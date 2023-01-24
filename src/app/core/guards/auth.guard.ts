import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "@core/services";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.currentUser;

    if (user) {
      // check if route is restricted by role
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(user.role) === -1
      ) {
        // role not authorised so redirect to home page
        this.router.navigate(['/user/login']);
        return false;
      }

      // authorised so return true
      return true;
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
