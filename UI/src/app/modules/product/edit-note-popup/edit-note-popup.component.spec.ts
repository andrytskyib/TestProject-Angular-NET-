import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotePopupComponent } from './edit-note-popup.component';

describe('EditNotePopupComponent', () => {
  let component: EditNotePopupComponent;
  let fixture: ComponentFixture<EditNotePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
