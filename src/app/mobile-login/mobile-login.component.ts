import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { User } from '../models/user';
import { Mapper } from '../shared/mapper';
import { UserGoogle } from '../models/userGoogle';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../cart/cart.service';
import { LoginDTO } from '../models/login';
import { SignupDTO } from '../models/signup';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css']
})
export class MobileLoginComponent {
  isLogInSelected = true;
  isSignUpSelected = false;
  loginForm: LoginDTO = new LoginDTO();
  signupForm: SignupDTO = new SignupDTO();
  constructor(private authService: AuthService,
    private notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    public cartService: CartService,
    private errorHandlerService: ErrorHandlerService
  ) {

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
  close() {
    
  }
  logInViaGoogle() {
    
    // if (this.authService.verifyAuth()) {
    //   this.notificationService.openModal({
    //     type: NotificationType.AUTHERROR,
    //     message: "Invalid authentication, please refresh the page",
    //     header: null,
    //     timer: 3000})
    //     return;
    // }
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
      this.notificationService.openModal({
        type: NotificationType.AUTHERROR,
        message: "Invalid authentication, please refresh the page",
        header: null,
        timer: 3000})
        return;
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
  toggleLogIn() {
    this.isLogInSelected = true;
    this.isSignUpSelected = false;
  }
  toggleSignUp() {
    this.isLogInSelected = false;
    this.isSignUpSelected = true;
  }
}
