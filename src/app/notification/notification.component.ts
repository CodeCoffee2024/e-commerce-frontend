import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from '../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() data: {type: NotificationType, message: string, header: string | null, timer: Number};
  ngOnInit(): void {
    
  }
  close() {

  }
  getIcon(type:NotificationType) {
    switch (type) {
      case NotificationType.ADDTOCART:
        return 'fa-check text-success'
      break;
      case NotificationType.NOITEMSELECTED:
        return 'fa-shopping-basket text-warning'
      break;
      case NotificationType.AUTHERROR:
        return 'fa-user-o text-danger'
      break;
      case NotificationType.SUCCESSLOGIN:
        return 'fa-user-o text-success'
      break;
      case NotificationType.ADDADDRESS:
        return 'fa-map text-success'
      break;
      case NotificationType.REMOVEADDRESS:
        return 'fa-map text-success'
      break;
      default:
        return 'fa-question-mark text-success';
      
    }
  }
}
