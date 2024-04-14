import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import * as numeral from 'numeral';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit{
  carts: any = []
  userData: any
  numeral = numeral;

  constructor(private service: ReservationService, private toatser: ToastrService) {}

  ngOnInit(): void {
    this.getUserData()
    this.getCarts()
  }

  getCarts(){
    this.service.getCartsOfUser(this.userData.userId).subscribe((data:any)=>{
      this.carts = data.carts
    })
  }

  getUserData() {
    let token = localStorage.getItem('token') ;

    if (token) {
        this.userData = JSON.parse(window.atob(token.split('.')[1]));
    }

  }

  getStatusColor(saleStatus: string): string {
    switch (saleStatus) {
      case 'pending':
        return '#FFA500'; // Light orange
      case 'delivered':
        return '#008000'; // Dark green
      case 'wait':
        return '#87CEEB'; // Light blue
      default:
        return '#808080'; // Light gray
    }
  }

  cancel(cartId: string){
    this.service.cancelCart(cartId).subscribe(
      (res: any) => {
        this.toatser.warning(res.message)
        this.getCarts();
      })
  }


}
