import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingAddressComponent } from './update-shipping-address.component';

describe('UpdateShippingAddressComponent', () => {
  let component: UpdateShippingAddressComponent;
  let fixture: ComponentFixture<UpdateShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShippingAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
