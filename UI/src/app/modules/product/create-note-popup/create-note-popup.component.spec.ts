import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotePopupComponent } from './create-note-popup.component';

describe('CreateNotePopupComponent', () => {
  let component: CreateNotePopupComponent;
  let fixture: ComponentFixture<CreateNotePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
