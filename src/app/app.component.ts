import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'market-user';
  showHeader: boolean = true;
  showCard: boolean = true
  nbProductsInCart: number = 0;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlAfterRedirects = event.urlAfterRedirects || '';
        const url = event.url || '';
        this.showHeader = !['/login', '/register', '/contact', '/forget-password'].includes(urlAfterRedirects) && !urlAfterRedirects.startsWith('/forget-password/');
        this.showCard = !['/cart', '/login', '/register', '/contact', '/forget-password'].includes(url) && !url.startsWith('/forget-password/');
      }
    });
  }


  ngOnInit(): void {
    this.updateCartCount();

    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'cart') {
      this.updateCartCount();
    }
  }

  private updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.nbProductsInCart = cart.length;
  }

}
