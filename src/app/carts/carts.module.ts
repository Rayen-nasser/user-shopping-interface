import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';



@NgModule({
  declarations: [
    CartComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    GeoapifyGeocoderAutocompleteModule
  ],
  exports: [CartComponent]
})
export class CartsModule { }
