import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data!: any;
  addButton: boolean = false;
  quantity: number = 1;
  done: boolean = false
  constructor(
    private  services: ProductsService
  ) {}

  ngOnInit(): void {
    this.done = this.services.isProductInCart(this.data._id)
  }

  add() {
    this.services.addToCart(this.data, this.quantity)
  }

}
