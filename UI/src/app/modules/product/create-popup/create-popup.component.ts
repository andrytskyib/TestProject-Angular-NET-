import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import uniqid from 'uniqid';
import { ProductModel } from '../../../common/api/models/product-model';
import { ProductService } from '../../../common/api/services/product.service';
import { UserService } from '../../../common/api/services/user.service';
import { UserModel } from '../../../common/api/models/user-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-popup',
  templateUrl: './create-popup.component.html',
  styleUrls: ['./create-popup.component.scss']
})
export class CreatePopupComponent implements OnInit, OnDestroy {

  createFrom: FormGroup;
  user: UserModel;

  subscription$: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductModel>,
    private productService: ProductService,
    private userService: UserService) { }

  ngOnInit() {
    this.initForm();

    this.subscription$ = this.userService.user$.subscribe(res => {
      this.user = res;
    });
  }

  initForm() {
    this.createFrom = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
    });
  }

  acceptAndClose() {
    if (this.createFrom.valid) {
      const params: ProductModel = {
        id: uniqid(),
        creationDate: new Date(),
        creatorId: this.user ? this.user.id : null,
        ...this.createFrom.value
      };

      this.productService.CreateProduct(params).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  cancelAndClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
