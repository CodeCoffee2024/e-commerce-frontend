import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../cart/cart.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { Login, LoginDTO } from '../models/login';
import { Signup, SignupDTO } from '../models/signup';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogInSelected = true;
  isSignUpSelected = false;
  loginForm: LoginDTO = new LoginDTO();
  signupForm: SignupDTO = new SignupDTO();
  constructor(
    private authService: AuthService,
    private activeModal: NgbActiveModal,
    private cartService: CartService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService,
  ) { }
  signUp() {
    this.authService.registerDefault(this.signupForm).subscribe({
      next:(it) =>{
        this.authService.setAuth(it);
        this.cartService.loadCart(it)
        this.authService.updateDisplayName();
        this.activeModal.close(); 
        this.notificationService.openModal({
          type: NotificationType.SUCCESSLOGIN,
          message: "Welcome "+localStorage.getItem('displayName'),
          header: null,
          size: 'sm',
          timer: 2000})
          return;
      }, error: (error) => {
        this.signupForm.errors = this.errorHandlerService.handleFormError(error, this.signupForm.errors);
      }
    });
  }
  logInViaGoogle() {
    if (this.authService.verifyAuth()) {
      this.notificationService.openModal({
        type: NotificationType.AUTHERROR,
        message: "Invalid authentication, please refresh the page",
        header: null,
        timer: 3000})
        return;
    }
    this.authService.loginWithGoogle()
    .then(res => {
      let userData = {
        name: res.user?.displayName,
        google: res.user,
        email: res.user.email,
        isGoogleAccount: true,
        isFacebookAccount: false
      }
      this.authService.loginGoogleUser(userData).subscribe(it => {
        this.authService.setAuth(it);
        this.cartService.loadCart(it)
        this.authService.updateDisplayName();
        this.activeModal.close({'success': true});
      });
    })
    .catch(err => console.error(err));
  }
  signUpViaGoogle() {
    if (this.authService.verifyAuth()) {
      window.location.reload();
    }
    this.authService.signUpWithGoogle()
    .then(res => {
      let userData = {
        name: res.user?.displayName,
        google: res.user,
        email: res.user.email,
        isGoogleAccount: true,
        isFacebookAccount: false
      }
      this.authService.registerGoogleUser(userData).subscribe(it => {
        this.authService.setAuth(it);
        this.authService.updateDisplayName();
        let data = {'success': true};
        this.activeModal.close(data); 
      });
    })
    .catch(err => console.error(err));
  }
  logInDefault() {
    this.authService.logInDefault(this.loginForm).subscribe({
      next:(it) =>{
        this.authService.setAuth(it);
        this.cartService.loadCart(it)
        this.authService.updateDisplayName();
        this.activeModal.close(); 
        this.notificationService.openModal({
          type: NotificationType.SUCCESSLOGIN,
          message: "Welcome "+localStorage.getItem('displayName'),
          header: null,
          size: 'sm',
          timer: 2000})
          window.location.reload();
          return;
      }, error: (error) => {
        this.loginForm.errors = this.errorHandlerService.handleFormError(error, this.loginForm.errors);
      }
    });
  }
  toggleLogIn() {
    this.isLogInSelected = true;
    this.isSignUpSelected = false;
  }
  toggleSignUp() {
    this.isLogInSelected = false;
    this.isSignUpSelected = true;
  }
  close() {
    this.activeModal.close('Close click');
  }
}
