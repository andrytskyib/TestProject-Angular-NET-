import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPopupComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginPopupComponent
  ],
  entryComponents: [
    LoginPopupComponent
  ]
})
export class SharedModule { }
