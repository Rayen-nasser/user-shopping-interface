import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: string = environment.baseApi.replace('stock', 'cart')

  constructor(
    private http: HttpClient
  ) { }

  getCartsOfUser(userId: string){
    return this.http.get(this.url + '/user/' + userId);
  }

  cancelCart(cartId: string){
    return this.http.get(this.url + "/cancel/" + cartId);
  }
}
