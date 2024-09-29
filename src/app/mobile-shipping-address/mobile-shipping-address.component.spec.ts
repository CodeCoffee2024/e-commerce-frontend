import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShippingAddressComponent } from './mobile-shipping-address.component';

describe('MobileShippingAddressComponent', () => {
  let component: MobileShippingAddressComponent;
  let fixture: ComponentFixture<MobileShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileShippingAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
