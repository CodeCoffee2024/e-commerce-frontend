import { Component, Input, OnInit } from '@angular/core';
import { DialogType } from '../models/dialog';
import { ResponseType } from '../models/response';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() data: {type: DialogType, message: string};
  DialogType = DialogType;
  ResponseType = ResponseType;
  constructor(private activeModal: NgbActiveModal) {

  }
  ngOnInit() {

  }
  respond(response: ResponseType) {
    this.activeModal.close(response);
  }
  get firstButtonText() {
    switch(this.data.type) {
      case DialogType.OKCANCEL:
        return 'Ok'
      default:
        return "Yes"
    }
  }
  get middleButtonText() {
    return 'Maybe';
  }
  get lastButtonText() {
    switch(this.data.type) {
      case DialogType.OKCANCEL:
        return 'Cancel'
      default:
        return "No"
    }
  }
}
