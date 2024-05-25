import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() productData!: any;
  productDetails!: any;
  productId!: string;
  quantity: number = 1;
  isAdding: boolean = false;
  isAdded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchProductDetails(this.productId);
    this.checkQuantityInCart();
  }

  fetchProductDetails(id: string): void {
    this.productService.getProductDetails(id).subscribe((res: any) => {
      this.productDetails = res;
    });
  }

  checkQuantityInCart(): void {
    this.isAdded = this.productService.isProductInCart(this.productId);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((item: any) => item.item._id === this.productId);
    this.quantity = index !== -1 ? cart[index].quantity : 1;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.productService.addToCart(this.productDetails, this.quantity);
  }

  toggleAdding(): void {
    this.isAdding = !this.isAdding;
  }

  saveAndToggleAdding(): void {
    this.addToCart()
    this.isAdding = false;
    this.isAdded = true;
  }

}
