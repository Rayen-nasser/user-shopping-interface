import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CartsService } from '../services/carts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  address: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private matDialog: MatDialog,
    private service: CartsService,
    private toaster: ToastrService
  ){}

  ngOnInit(): void {

  }

  onPlaceSelected(place: any): void {
    this.address = place
  }

  reserve(){
    const cartItems = {
      ...this.data.model,
      address: this.address
    }
    this.service.createNewCart(cartItems).subscribe((res: any) => {
      this.toaster.success(res.message);
      this.close()
      localStorage.removeItem('cart');
      window.dispatchEvent(new StorageEvent('storage', { key: 'cart' }));
    });
  }

  close() {
    this.matDialog.closeAll();
  }
}
