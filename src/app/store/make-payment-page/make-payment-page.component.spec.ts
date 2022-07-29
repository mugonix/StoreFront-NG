import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentPageComponent } from './make-payment-page.component';

describe('MakePaymentPageComponent', () => {
  let component: MakePaymentPageComponent;
  let fixture: ComponentFixture<MakePaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
