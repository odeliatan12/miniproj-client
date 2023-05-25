import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { allDeals, reservationDetails, vouchers } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile-dropdowns',
  templateUrl: './user-profile-dropdowns.component.html',
  styleUrls: ['./user-profile-dropdowns.component.css']
})
export class UserProfileDropdownsComponent implements OnInit {

  resDetails: reservationDetails[] = []
  vouchers: vouchers[] = []

  constructor(private reservationService: ReservationService, private fb: FormBuilder, private route: Router, private dealService: DealService){ }

  ngOnInit(): void {
    this.reservationService.getReservationbyId()
      .then(result => {
        this.resDetails = result
      })
    this.dealService.getVouchersbyId()
      .then(result => {
        this.vouchers = result
      })
  }

  deleteReservation(idx: number){
    this.reservationService.deleteEvent(idx)
      .then(result => {
        console.log(result)
      }).catch(result => {
        this.route.navigate(['user/profile'])
        Swal.fire({
          title: 'Reservation has been deleted',
          icon: 'success',
          timer: 3000
        }
          
        )
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      })
  }

  goTodeal(idx: string){
    this.route.navigate(['user/deals', idx])
  }

  

}
