import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | Observable<boolean> | Promise<boolean> {
    const auth = this.authService.getIsAuth();
    if (!auth) {
      this.router.navigate(['login']);
    }

    return auth;
  }
}
