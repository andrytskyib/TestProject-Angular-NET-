import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../../../common/api/models/product-model';
import { ProductService } from '../../../common/api/services/product.service';
import { UtilityService } from '../../../common/services/utility.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NoteService } from '../../../common/api/services/note.service';
import { NoteModel } from '../../../common/api/models/note-model';
import { CreateNotePopupComponent } from '../create-note-popup/create-note-popup.component';
import { EditNotePopupComponent } from '../edit-note-popup/edit-note-popup.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string;

  productForm: FormGroup;
  productModel: ProductModel = new ProductModel();

  noteDataSource = new MatTableDataSource<NoteModel>([]);
  displayedColumns: string[] = ['actions', 'id', 'creationDate', 'message', 'productId'];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private noteService: NoteService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.initForm();
    this.getProduct();
    this.getNotes();
  }

  initForm() {
    this.productForm = this.fb.group(this.productModel);

    this.productForm.get('id').disable();
    this.productForm.get('name').setValidators([Validators.required]);
    this.productForm.get('name').updateValueAndValidity();
    this.productForm.get('description').setValidators([Validators.required]);
    this.productForm.get('description').updateValueAndValidity();
    this.productForm.get('price').setValidators([Validators.required]);
    this.productForm.get('price').updateValueAndValidity();
    this.productForm.get('creationDate').disable();
    this.productForm.get('creatorId').disable();
  }

  getProduct() {
    this.productService.GetProduct(this.productId).subscribe(res => {
      this.productForm.patchValue(res);
      this.productForm.markAsPristine();
    });
  }

  save() {
    if (this.productForm.valid) {
      this.productService.UpdateProduct(this.productForm.getRawValue()).subscribe(res => {
        this.productForm.patchValue(res);
        this.productForm.markAsPristine();
        this.utilityService.openSnackBar('Success', 'success');
      });
    }
  }

  getNotes() {
    this.noteService.GetProductNote(this.productId).subscribe(res => {
      this.noteDataSource.data = res;
    });
  }

  createNote() {
    const dialogRef = this.dialog.open(CreateNotePopupComponent, {
      width: '400px',
      disableClose: true,
      data: this.productId
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getNotes();
        this.utilityService.openSnackBar('Success', 'success');
      }
    });
  }

  editNote(note) {
    const dialogRef = this.dialog.open(EditNotePopupComponent, {
      width: '400px',
      disableClose: true,
      data: note
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getNotes();
      this.utilityService.openSnackBar('Success', 'success');
    });
  }

  deleteNote(id) {
    this.noteService.DeleteProductNote(id).subscribe(res => {
      this.getNotes();
      this.utilityService.openSnackBar('Success', 'success');
    });
  }

}
