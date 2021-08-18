import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../common/api/models/login-model';
import { UserService } from '../../common/api/services/user.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UtilityService } from '../../common/services/utility.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  loginFrom: FormGroup;
  loginModel: LoginModel = new LoginModel();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<LoginModel>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginFrom = this.fb.group(this.loginModel);

    this.loginFrom.get('email').setValidators([Validators.required, Validators.email]);
    this.loginFrom.get('email').updateValueAndValidity();
    this.loginFrom.get('password').setValidators([Validators.required, Validators.minLength(6)]);
    this.loginFrom.get('password').updateValueAndValidity();
  }

  acceptAndClose() {
    if (this.loginFrom.valid) {
      this.userService.Login(this.loginFrom.value).subscribe(res => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          this.userService.GetUser(res);
          this.utilityService.openSnackBar('Success', 'success');
          this.dialogRef.close();
        } else {
          this.utilityService.openSnackBar('Incorrect login or password', 'error');
        }
      });
    }
  }


  cancelAndClose(): void {
    this.dialogRef.close();
  }
}
