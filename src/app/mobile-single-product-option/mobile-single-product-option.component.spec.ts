import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSingleProductOptionComponent } from './mobile-single-product-option.component';

describe('MobileSingleProductOptionComponent', () => {
  let component: MobileSingleProductOptionComponent;
  let fixture: ComponentFixture<MobileSingleProductOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSingleProductOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSingleProductOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
