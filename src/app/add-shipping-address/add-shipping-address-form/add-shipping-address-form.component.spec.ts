import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingAddressFormComponent } from './add-shipping-address-form.component';

describe('AddShippingAddressFormComponent', () => {
  let component: AddShippingAddressFormComponent;
  let fixture: ComponentFixture<AddShippingAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingAddressFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
