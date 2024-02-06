import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {




  dataSource: any = [];
  categories: string[] = [];
  cartProducts: any[] = [];
  page: number = 1;
  total: number = 0;
  timeOut: any;
  filtration: any = {
    status: "available",
    page: this.page,
    limit: this.total / 4,
  };

  constructor(private service: ProductsService, private toast: ToastrService) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.service.getProducts(this.filtration).subscribe((response: any) => {
      this.dataSource = response.products;
      this.total = response.totalItems;
    });
  }

  getAllCategories() {
    this.service.getCategoriesData();
  }

  getDataFromSubject() {
    this.service.categoriesData.subscribe((response: any) => {
      this.categories = response.data;
    });
  }

  search(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['productName'] = event.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllProducts();
    }, 2000);
  }

  selectCategory(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.service.getProductsInCategory(event.value).subscribe((res: any) => {
      this.dataSource = res.products;
      this.total = res.totalItems;
    });
  }

  changePage(event: any) {
    this.page = event;
    this.getAllProducts();
  }
}
