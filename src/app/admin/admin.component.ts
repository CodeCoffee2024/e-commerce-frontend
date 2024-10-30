import { AfterViewChecked, Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isCollapsed = false;
  showLabels = true;
  invalidView = false;
  constructor(private authService: AuthService, private router: Router) {
    this.checkWindowWidth();
  }
  ngOnInit(): void {
    if (!this.authService.verifyAuth(true)) {
      this.router.navigate(['admin/login']);
    }
    return;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowWidth();
  }
  checkWindowWidth() {
    if (window.innerWidth < 768) {
      this.invalidView = true;
    } else {
      this.invalidView = false;
    }
  }
  navItems = [
    { label: 'Home', icon: 'fa-home', link: '/' },
    { label: 'Orders', icon: 'fa-dollar', link: '/admin/order' },
    { label: 'Products', icon: 'fa-shopping-basket', link: '/admin/product' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.showLabels = false;
      return;
    }
    setTimeout(() => {
      this.showLabels = true;
    }, 300);
  }
}
