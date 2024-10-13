import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShippingAddressComponent } from './list-shipping-address.component';

describe('ListShippingAddressComponent', () => {
  let component: ListShippingAddressComponent;
  let fixture: ComponentFixture<ListShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShippingAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
