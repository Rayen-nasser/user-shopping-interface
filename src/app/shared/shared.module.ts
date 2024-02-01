import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    BrowserModule,
    FormsModule,
    RouterModule,
    NotFoundComponent
  ]
})
export class SharedModule { }
