import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPaymentComponent } from './school-payment.component';

describe('SchoolPaymentComponent', () => {
  let component: SchoolPaymentComponent;
  let fixture: ComponentFixture<SchoolPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
