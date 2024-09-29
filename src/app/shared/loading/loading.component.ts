import { Component, Input } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading = false;

  constructor(private loadingService: LoadingService, public dashboardService: DashboardService) {
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
