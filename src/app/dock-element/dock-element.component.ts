import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dock-element',
  templateUrl: './dock-element.component.html',
  styleUrls: ['./dock-element.component.css']
})
export class DockElementComponent implements OnInit{

  @Input() data: any;
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  private componentRef: ComponentRef<any> | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.data && this.data.targetComponent) {
      const componentFactory = this.viewContainerRef.createComponent(this.data.targetComponent);
      this.componentRef = componentFactory;
    }
  }

  close() {
    this.activeModal.close('Close click');
  }
}
