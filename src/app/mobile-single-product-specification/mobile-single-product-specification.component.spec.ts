import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSingleProductSpecificationComponent } from './mobile-single-product-specification.component';

describe('MobileSingleProductSpecificationComponent', () => {
  let component: MobileSingleProductSpecificationComponent;
  let fixture: ComponentFixture<MobileSingleProductSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSingleProductSpecificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSingleProductSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
