import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoadingService } from '../shared/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DockElementComponent } from '../dock-element/dock-element.component';
import { MobileLoginComponent } from '../mobile-login/mobile-login.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItems: string;
  loadedOnce = false;
  displayName = null;
  constructor(private cartService: CartService,
    private route: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private loadingService: LoadingService
  ){
  }
  async ngOnInit() {
    this.loadingService.show();
    await this.cartService.getCart().then(as=>{
      this.loadingService.hide();
    });
    this.cartService.cartItems$.subscribe(() => {
      this.totalItems = this.cartService.getTotalCountItems() > 99 ? "99+" : this.cartService.getTotalCountItems().toString();
    });
    this.authService.verifyAuth();
    this.authService.displayName$.subscribe(displayName => {
      this.displayName = displayName;
    });
    this.displayName = this.displayName.length > 0 ? this.displayName : this.authService.displayName;
  }
  goToCart() {
    this.route.navigate(['cart'])
  }
  logout() {
    this.authService.logout();
    this.route.navigate([''])
    window.location.reload();
  }
  logIn() {
    this.loadingService.show();
    if (this.authService.verifyAuth()) {
      window.location.reload();
    } else {
      if (window.innerWidth <= 768) {
        this.loadingService.hide();
        const modalRef = this.modalService.open(DockElementComponent, { 
          backdrop: 'static',  // Optional: Prevent closing by clicking outside
          keyboard: false,      // Optional: Prevent closing by ESC key });
          animation: false
        });
        modalRef.componentInstance.data = {
          title: "Login",
          hideTitle: true,
          targetComponent: MobileLoginComponent
        };
        modalRef.result.then((result) => {
          if (result?.success) {
            window.location.reload();
          }
        });
      } else {
        const modalRef = this.modalService.open(LoginComponent, { 
          animation: false,
          centered: true
        });
        this.loadingService.hide();
      }
    }
  }
}
