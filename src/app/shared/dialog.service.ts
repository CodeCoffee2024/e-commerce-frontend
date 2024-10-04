import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) {}
  openModal(data: any): Promise<any>  {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      backdrop: 'static', 
      size: data?.size,
      centered: true  // This ensures the modal is vertically centered
    });

    modalRef.componentInstance.data = data;
    return modalRef.result;
  }
}
