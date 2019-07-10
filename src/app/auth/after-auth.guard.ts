import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AfterAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    console.log(isAuth);
    if (isAuth) {
      this.router.navigate(['techentries']);
      return false;
    } else {
      return true;
    }
  }
}
