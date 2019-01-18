import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class MatSnackService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number) {
    return this.snackBar.open(message, null, {
      duration: duration
    }).afterDismissed();
  }
}
