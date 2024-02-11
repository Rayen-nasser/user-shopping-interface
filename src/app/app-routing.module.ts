import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ContactComponent } from './contact/conponents/contact/contact.component';
import { ForgetPasswordComponent } from './auth/components/forget-password/forget-password.component';

const routes: Routes = [
  {path:"products", component: AllProductsComponent},
  {path:"details/:id", component: ProductDetailsComponent},
  {path:"cart", component: CartComponent},
  {path:"contact", component: ContactComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"forget-password", component: ForgetPasswordComponent},
  {path:"forget-password/:userId/:token", component: ForgetPasswordComponent},
  {path:"**", redirectTo: "products", pathMatch:"full"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
