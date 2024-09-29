import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockElementComponent } from './dock-element.component';

describe('DockElementComponent', () => {
  let component: DockElementComponent;
  let fixture: ComponentFixture<DockElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
