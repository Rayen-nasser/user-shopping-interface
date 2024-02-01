import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  createNewCart(order: any){
    return this.http.post(environment.baseApi.replace('stock', 'cart') + "/add-cart", order);
  }
}
