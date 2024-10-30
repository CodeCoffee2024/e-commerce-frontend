import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderItemStatusComponent } from './update-order-item-status.component';

describe('UpdateOrderStatusComponent', () => {
  let component: UpdateOrderItemStatusComponent;
  let fixture: ComponentFixture<UpdateOrderItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderItemStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
