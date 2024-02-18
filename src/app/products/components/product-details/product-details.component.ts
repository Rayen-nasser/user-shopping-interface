import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() data!: any;
  dataProduct!: any;
  idProduct: any;
  quantity: number = 1;
  addButton: boolean = false
  done: boolean = false

  constructor(
    private router: ActivatedRoute,
    private services: ProductsService
  ) {
    this.idProduct = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.services.getProductDetails(this.idProduct).subscribe((res: any) => {
      this.dataProduct = res;
    });
    this.findQuantityInCart()
  }

  findQuantityInCart(){
    this.done = this.services.isProductInCart(this.idProduct)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    let index = cart.findIndex((item: any) => {
      return item.item._id === this.idProduct
    })

    this.quantity = cart[index].quantity
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  add() {
    this.services.addToCart(this.dataProduct, this.quantity)
  }

}
