import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductDialogComponent } from './manage-product-dialog.component';

describe('ManageProductDialogComponent', () => {
  let component: ManageProductDialogComponent;
  let fixture: ComponentFixture<ManageProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
