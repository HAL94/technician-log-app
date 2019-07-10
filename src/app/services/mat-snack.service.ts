import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class MatSnackService {

  constructor(private snackBar: MatSnackBar) { }
  snackbarSuccessConfig = {
    panelClass: 'snackbar-bg-success',
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };
  snackbarFailConfig = {
    panelClass: 'snackbar-bg-fail',
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };
  openSnackBar(message: string, duration: number, config?: any) {
    return this.snackBar.open(message, null, {
      duration: duration,
      ...config
    }).afterDismissed();
  }
}
