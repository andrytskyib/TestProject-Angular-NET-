import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../../common/api/services/note.service';
import { NoteModel } from '../../../common/api/models/note-model';
import { MatDialogRef } from '@angular/material';
import uniqid from 'uniqid';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-popup',
  templateUrl: './create-note-popup.component.html',
  styleUrls: ['./create-note-popup.component.scss']
})
export class CreateNotePopupComponent implements OnInit {

  createFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<NoteModel>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createFrom = this.fb.group({
      message: ['', Validators.required],
    });
  }

  acceptAndClose() {
    if (this.createFrom.valid) {
      const params: NoteModel = {
        id: uniqid(),
        creationDate: new Date(),
        productId: this.data,
        ...this.createFrom.value
      };

      this.noteService.CreateProductNote(params).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  cancelAndClose(): void {
    this.dialogRef.close();
  }

}
