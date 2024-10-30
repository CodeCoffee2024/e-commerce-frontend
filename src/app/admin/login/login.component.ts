import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notification';
import { UserDTO, UserForm } from 'src/app/models/user';
import { NotificationService } from 'src/app/notification/notification.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user: UserForm = new UserForm();
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {

  }
  ngOnInit(): void {
    if (this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['admin/dashboard']);
    }
    return;
  }
  onSubmit() {
    this.loadingService.show();
    if (this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['admin/dashboard']);
    } else {
      this.authService.logInAdmin(this.user).subscribe({
        next: (result) => {
          this.authService.setAuth(result);
          this.authService.updateDisplayName();
          this.notificationService.openModal({
            type: NotificationType.SUCCESSLOGIN,
            message: "Welcome "+localStorage.getItem('displayName'),
            header: null,
            size: 'sm',
            timer: 2000})
            this.loadingService.hide();
            this.router.navigate(['admin/dashboard']);
            return;
          
        }, error: (error) => {
          this.loadingService.hide();
          this.user.errors = this.errorHandlerService.handleFormError(error, this.user.errors);
        }, complete: () => {
          this.loadingService.hide();
          this.router.navigate(['admin/dashboard']);
        }
      });}
  }
}
