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
  @Output() item = new EventEmitter();
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
    this.done = this.services.isProductInCart(this.idProduct)
  }

  add() {
    this.services.addToCart(this.dataProduct, this.quantity)
  }

}
