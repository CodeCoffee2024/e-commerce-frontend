import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isCollapsed = false;
  showLabels = true;

  navItems = [
    { label: 'Home', icon: 'fa-home', link: '/' },
    { label: 'Orders', icon: 'fa-shopping-basket', link: '/admin/order' }
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
