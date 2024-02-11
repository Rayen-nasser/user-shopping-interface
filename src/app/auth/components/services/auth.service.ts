import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlAuth:any = environment.baseApi.replace('stock', 'auth')
  urlResetPassword:any = environment.baseApi.replace('/stock', '')

  constructor(
    private http: HttpClient
  ) { }

  register(model: FormData){
    return this.http.post( this.urlAuth + "/register", model);
  }

  login(model: FormData){
    return this.http.post( this.urlAuth + "/login", model);
  }

  forgetPassword(email: string, urlPage: string){
    return  this.http.post(this.urlResetPassword + '/forget-password', {email, urlPage});
  }

  resetPassword(data: any, password: string){
    return  this.http.post(this.urlResetPassword + '/reset-password/' + data.userId + '/' + data.token , {password});
  }
}
