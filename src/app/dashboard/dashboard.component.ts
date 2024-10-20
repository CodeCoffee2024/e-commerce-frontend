import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { Mapper } from '../shared/mapper';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation
})
export class DashboardComponent implements OnInit, OnDestroy {
  images = [
    {
      url: 'assets/ad-1.jpg'
    },
    {
      url: 'assets/ad-2.jpg'
    }
  ];
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  products : Array<Product> = [];
  isLoadingProducts = true;
  isLoadingCategories = true;
  categories : Array<Category> = [];
  private countdownInterval: any;
  
  constructor(
    public dashboardService: DashboardService,
    private route: Router,
    private loadingService: LoadingService
  ) {
  }
  ngOnInit() {
    const targetDate = new Date();
    this.loadingService.show();
    targetDate.setHours(targetDate.getHours() + 1);
    this.countdownInterval = setInterval(() => {
      this.updateCountdown(targetDate);
    }, 1000);
    this.dashboardService.getAllProducts().subscribe({
      next: (products) => {
        let productMapper = new Mapper<Product[], Product[]>((products: Product[]): Product[] => {
          return products;
        })
        this.products = productMapper.map(products as Product[]);
        this.isLoadingProducts = false;
      }, error: (result) => {
        this.isLoadingProducts = false;
      },complete: ()=>{
        this.loadingService.hide();
      }
    });
    this.dashboardService.getAllCategories().subscribe({
      next: (categories) => {
        let categoryMapper = new Mapper<Category[], Category[]>((categories: Category[]): Category[] => {
          return categories;
        })
        this.categories = categoryMapper.map(categories as Category[]);
        this.isLoadingCategories = false;
      }, error: (result) => {
        this.isLoadingCategories = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  updateCountdown(targetDate: Date) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(this.countdownInterval);
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;
    }

    const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.animateFlip('hours', this.hours, newHours);
    this.animateFlip('minutes', this.minutes, newMinutes);
    this.animateFlip('seconds', this.seconds, newSeconds);

    this.hours = newHours;
    this.minutes = newMinutes;
    this.seconds = newSeconds;
  }

  animateFlip(unit: string, oldValue: number, newValue: number) {
    if (oldValue !== newValue) {
      const element = document.querySelector(`.countdown-item:nth-child(${this.getIndex(unit)}) .flip-card-inner`) as HTMLElement;
      if (element) {
        element.classList.add('flip');
        setTimeout(() => {
          element.classList.remove('flip');
        }, 600); // Duration should match the CSS transition
      }
    }
  }
  getIndex(unit: string): number {
    switch (unit) {
      case 'hours': return 1;
      case 'minutes': return 2;
      case 'seconds': return 3;
      default: return 1;
    }
  }
  goToProduct(product: Product) {
    this.route.navigate(['/product/'+ product.id])
  }
}
