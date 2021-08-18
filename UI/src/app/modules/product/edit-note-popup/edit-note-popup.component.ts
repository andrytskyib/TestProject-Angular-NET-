import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteModel } from '../../../common/api/models/note-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from '../../../common/api/services/note.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-note-popup',
  templateUrl: './edit-note-popup.component.html',
  styleUrls: ['./edit-note-popup.component.scss']
})
export class EditNotePopupComponent implements OnInit {

  editFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NoteModel>,
    @Inject(MAT_DIALOG_DATA) public data: NoteModel,
    private noteService: NoteService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editFrom = this.fb.group(this.data);

    this.editFrom.get('id').disable();
    this.editFrom.get('creationDate').disable();
    this.editFrom.get('message').setValidators([Validators.required]);
    this.editFrom.get('message').updateValueAndValidity();
    this.editFrom.get('productId').disable();
  }

  acceptAndClose() {
    if (this.editFrom.valid) {
      this.noteService.UpdateProductNote(this.editFrom.getRawValue()).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  cancelAndClose(): void {
    this.dialogRef.close();
  }

}
