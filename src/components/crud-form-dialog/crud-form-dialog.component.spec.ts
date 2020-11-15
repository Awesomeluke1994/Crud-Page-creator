import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFormDialogComponent } from './crud-form-dialog.component';

describe('CrudFormModalComponent', () => {
  let component: CrudFormDialogComponent;
  let fixture: ComponentFixture<CrudFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
