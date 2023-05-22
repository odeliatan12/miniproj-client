import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { reservation, timing } from 'src/app/models/model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-user-reviews-reservation',
  templateUrl: './user-reviews-reservation.component.html',
  styleUrls: ['./user-reviews-reservation.component.css']
})
export class UserReviewsReservationComponent implements OnInit {

  form!: FormGroup
  timing: timing[] = []

  constructor(private reservationService: ReservationService, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
      
  }

  insertReservation(){
    const value = this.form.value as reservation
    this.reservationService.insertReservation(this.activatedRoute.snapshot.params["restaurantId"], value)
      .then(result => {
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

}
