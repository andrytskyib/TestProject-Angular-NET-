import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../common/api/models/user-model';
import { UserService } from '../../../common/api/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userModel: UserModel = new UserModel();

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initForm();

    this.getUser();
  }

  initForm() {
    this.userForm = this.fb.group(this.userModel);

    this.userForm.get('id').disable();
    this.userForm.get('creationDate').disable();
    this.userForm.get('password').disable();
    this.userForm.get('email').setValidators([Validators.required, Validators.email]);
    this.userForm.get('email').updateValueAndValidity();
  }

  getUser() {
    this.userService.user$.subscribe(res => {
      if (res) {
        this.userForm.patchValue(res);
        this.userForm.markAsPristine();
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.UpdateUser(this.userForm.getRawValue()).subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userService.setCurrentUser(res);
      });
    }
  }

}
