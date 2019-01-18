import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SignupRequest } from '../models/http-models/http-request-models/signup-request.model';
import { LoginResponse } from '../models/http-models/http-response-models/login-response.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { MatSnackService } from '../services/mat-snack.service';
import { handleHttpError } from './HttpErrorResponseUtility';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private authentication = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private user: User;

  constructor(private http: HttpClient,
    private router: Router,
    private snackBarService: MatSnackService,
    private userService: UserService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  signup(authData: SignupRequest) {
    this.http.post('http://localhost:3000/user/signup', authData)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['login']);
      });
  }

  login(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    };
    this.http.post<LoginResponse>('http://localhost:3000/user/login', authData)
      .pipe(
        catchError(handleHttpError)
      )
      .subscribe(result => {
        console.log(result);
        this.token = result.token;
        if (this.token) {
          this.snackBarService.openSnackBar('login successfully', 1000).subscribe(() => {
            this.isAuthenticated = true;
            this.authentication.next(this.isAuthenticated);
            this.setAuthTimer(result.expiresIn);
            this.initUser(result);

            const now = new Date();
            const expiration = new Date(now.getTime() + result.expiresIn * 1000);

            this.saveAuthData(result.token, expiration, this.user);
            this.router.navigate(['techentries']);
          });
        }
      }, errorMsg => {
        this.isAuthenticated = false;
        this.authentication.next(this.isAuthenticated);
        this.snackBarService.openSnackBar(errorMsg, 1500);
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.authentication.next(this.isAuthenticated);
    this.token = null;
    this.user = null;
    this.userService.nullifyUser();
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  getAuthentication(): Observable<boolean> {
    return this.authentication.asObservable();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    const now = new Date();
    const tokenExpiration = new Date(authInformation.expiration);
    const expiration = tokenExpiration.getTime() - now.getTime();

    if (expiration > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiration / 1000);
      this.initUser(authInformation.user);
      this.isAuthenticated = true;
      this.authentication.next(this.isAuthenticated);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (!token || !expiration || !user) {
      return;
    }

    const authInformation = {
      token: token,
      expiration: expiration,
      user: user
    };

    return authInformation;
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private initUser(result: any) {
    this.user = {
      id: result.id,
      email: result.email,
      fname: result.fname,
      lname: result.lname,
      badgeNumber: result.badgeNumber
    };
    if (result.birthDate) {
      this.user.birthDate = result.birthDate.toString();
    }
    this.userService.setUser(this.user);
    this.userService.updateUser();
  }
}


