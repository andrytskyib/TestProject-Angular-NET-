import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductRouting } from './product-routing.module';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePopupComponent } from './create-popup/create-popup.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateNotePopupComponent } from './create-note-popup/create-note-popup.component';
import { EditNotePopupComponent } from './edit-note-popup/edit-note-popup.component';

@NgModule({
  declarations: [
    ProductOverviewComponent,
    CreatePopupComponent,
    ProductDetailComponent,
    CreateNotePopupComponent,
    EditNotePopupComponent
  ],
  imports: [
    CommonModule,
    ProductRouting,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [CreatePopupComponent, CreateNotePopupComponent, EditNotePopupComponent]
})
export class ProductModule { }
