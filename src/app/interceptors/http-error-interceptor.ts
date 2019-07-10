import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MatSnackService } from '../services/mat-snack.service';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private matSnackbar: MatSnackService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error) => {

          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
              `Backend returned code ${error.error.status}, ` +
              `body was: ${error.error.message}`);
          }
          this.matSnackbar.openSnackBar(error.error.message, 2000, this.matSnackbar.snackbarFailConfig);
          return throwError(error);
        })
      );
  }
}
