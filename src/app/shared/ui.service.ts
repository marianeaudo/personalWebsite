import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService{

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message) {
    this.snackbar.open(message, null, {
      duration: 3000
    });
  }

}
