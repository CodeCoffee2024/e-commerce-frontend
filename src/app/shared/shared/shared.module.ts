import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { DropdownFormComponent } from '../dropdown-form/dropdown-form.component';
import { FormsModule } from '@angular/forms';
import { StatusLabelsComponent } from '../status-labels/status-labels.component';
import { ThArrowComponent } from '../th-arrow/th-arrow.component';



@NgModule({
  declarations: [PaginationComponent, DropdownFormComponent, StatusLabelsComponent, ThArrowComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PaginationComponent,
    DropdownFormComponent,
    FormsModule,
    StatusLabelsComponent,
    ThArrowComponent
  ]
})
export class SharedModule { }
