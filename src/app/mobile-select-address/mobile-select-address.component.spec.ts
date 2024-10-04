import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelectAddressComponent } from './mobile-select-address.component';

describe('MobileSelectAddressComponent', () => {
  let component: MobileSelectAddressComponent;
  let fixture: ComponentFixture<MobileSelectAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSelectAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSelectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
