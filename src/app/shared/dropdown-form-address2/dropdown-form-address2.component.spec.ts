import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFormAddress2Component } from './dropdown-form-address2.component';

describe('DropdownFormAddress2Component', () => {
  let component: DropdownFormAddress2Component;
  let fixture: ComponentFixture<DropdownFormAddress2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownFormAddress2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownFormAddress2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
