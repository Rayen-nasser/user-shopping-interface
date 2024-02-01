import { Component, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = []; // Initialize the array

  totalPrice: any;
  userDate: any;
  cardVide: boolean = false;

  constructor(
    private service: CartsService,
    private router: Router,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {
    this.getPriceTotal();
  }

  ngOnInit(): void {
    this.getProductsInCart();
    if (this.cartProducts.length > 0) {
      this.cardVide = true;
      this.getUserData();
    }
  }

  getProductsInCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getPriceTotal();
  }

  increaseQuantity(index: any) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getPriceTotal();
  }

  decreaseQuantity(index: any) {
    if (this.cartProducts[index].quantity > 0) {
      this.cartProducts[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getPriceTotal();
    }
  }

  detectChange(event: any) {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  getPriceTotal() {
    this.totalPrice = 0;
    for (let i in this.cartProducts) {
      this.totalPrice +=
        this.cartProducts[i].item.price * this.cartProducts[i].quantity;
    }
  }

  deleteProduct(index: number) {
    this.cartProducts = this.cartProducts.filter(
      (product, idx) => idx !== index
    );
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart' }));
    this.getPriceTotal();
  }

  deleteAllProducts() {
    localStorage.removeItem('cart');
    this.cartProducts = [];
    this.totalPrice = 0;
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart' }));
    this.getPriceTotal();
  }

  getUserData() {
    let token = localStorage.getItem('token') ;

    if (token) {
        this.userDate = JSON.parse(window.atob(token.split('.')[1]));
    }
  }


  order() {
    if (!localStorage.getItem('token')) {
      this.toaster.error('You Must Be Authentication');
      return;
    }

    let products = this.cartProducts.map((item) => {
      return {
        productId: item.item._id,
        quantity: item.quantity,
      };
    });
    this.getUserData();

    let Model = {
      userId: this.userDate['userId'],
      date: new Date(),
      products: products,
      amountTotal: this.totalPrice.toFixed(2),
    };

    this.sendOrder(Model)
  }

  sendOrder(model: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      model
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/products'])
    });
  }
}
