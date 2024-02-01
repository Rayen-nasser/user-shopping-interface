import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:any = environment.baseApi.replace('stock', 'auth')

  constructor(
    private http: HttpClient
  ) { }

  register(model: FormData){
    return this.http.post( this.url + "/register", model);
  }

  login(model: FormData){
    return this.http.post( this.url + "/login", model);
  }
}
