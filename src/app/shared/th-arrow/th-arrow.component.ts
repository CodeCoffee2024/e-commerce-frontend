import { Component, Input } from '@angular/core';

@Component({
  selector: 'th-arrow',
  templateUrl: './th-arrow.component.html',
  styleUrls: ['./th-arrow.component.css']
})
export class ThArrowComponent {
  @Input() sortDirection : string = '+';
  @Input() name : string;
  @Input() sort : string;
  @Input() description : string;
  ngOnInit(): void {
  }
  get sortColumn() {
    return this.sort?.substring(1);
  }
}