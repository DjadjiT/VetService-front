import { Injectable, TemplateRef } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor(private _snackBar: MatSnackBar) {
  }

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showMessage(message: string){
    this._snackBar.open(message, "Close");
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
