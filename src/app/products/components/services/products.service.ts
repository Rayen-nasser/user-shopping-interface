import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  categoriesData = new BehaviorSubject({});
  url = environment.baseApi.replace('auth', 'stock');

  constructor(private http: HttpClient) {}
  getProducts(productsFilter?: any) {
    let params = new HttpParams();

    Object.entries(productsFilter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    return this.http.get(this.url + '/all-products', { params });
  }

  getProductDetails(id: string){
    return this.http.get( environment.baseApi + "/product-details/" + id)
  }

  getCategories() {
    return this.http.get(this.url + '/categories');
  }

  getProductsInCategory(category: any) {
    return this.http.get(this.url + '/category/' + category);
  }

  getCategoriesData() {
    this.getCategories().subscribe((res: any) => {
      this.categoriesData.next({
        data: res.categories,
      });
    });
  }

  isProductInCart(idProduct: string) {
    const cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');

    const isFound = cartProducts.some((item: any) => {
      return item.item._id === idProduct;
    });

    return isFound;
  }

  addToCart(product: any,  quantity: number) {
    const cartKey = 'cart';
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const existingProductIndex = existingCart.findIndex(
      (item: any) => item.item._id === product._id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity = quantity;
      localStorage.setItem(cartKey, JSON.stringify(existingCart));
      return;
    }

    existingCart.push({
      item: product,
      quantity: quantity,
    });

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart' }));
  }
}
