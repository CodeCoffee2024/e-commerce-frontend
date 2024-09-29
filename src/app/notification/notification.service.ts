import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NgbModal) {}
  openModal(data: any) {
    const modalRef = this.modalService.open(NotificationComponent, {
      backdrop: 'static', 
      size: data?.size,
      centered: true  // This ensures the modal is vertically centered
    });

    modalRef.componentInstance.data = data;
    // Close modal after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      modalRef.close();
    }, data.timer ?? 3000);
  }
}
