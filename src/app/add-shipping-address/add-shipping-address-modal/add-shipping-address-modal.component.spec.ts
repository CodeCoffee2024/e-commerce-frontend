import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingAddressModalComponent } from './add-shipping-address-modal.component';

describe('AddShippingAddressModalComponent', () => {
  let component: AddShippingAddressModalComponent;
  let fixture: ComponentFixture<AddShippingAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingAddressModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
