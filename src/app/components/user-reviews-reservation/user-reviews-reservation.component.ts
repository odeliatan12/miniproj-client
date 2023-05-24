import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { reservation, timing } from 'src/app/models/model';
import { ReservationService } from 'src/app/services/reservation.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-reviews-reservation',
  templateUrl: './user-reviews-reservation.component.html',
  styleUrls: ['./user-reviews-reservation.component.css']
})
export class UserReviewsReservationComponent implements OnInit {

  form!: FormGroup
  timing: timing[] = []
  
  @ViewChild('liveToast', { static: false }) 
  toastElement!: ElementRef;

  constructor(private reservationService: ReservationService, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
      
  }

  insertReservation(){
    const value = this.form.value as reservation
    this.reservationService.insertReservation(this.activatedRoute.snapshot.params["restaurantId"], value)
      .then(result => {
        swal(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        console.log(result)
      })
  }

  getAvailableTimings(){
    const value = this.form.value
    console.log(value.dateReserve)
    return this.reservationService.getAvailableTimings(value.dateReserve, this.activatedRoute.snapshot.params["restaurantId"])
      .then(result => {
        console.log(result)
        this.timing = result
      })
  }

  // activateToast() {
  //   const toastBootstrap = new bootstrap.Toast(this.toastElement.nativeElement);
  //   toastBootstrap.show();
  // } 
}
