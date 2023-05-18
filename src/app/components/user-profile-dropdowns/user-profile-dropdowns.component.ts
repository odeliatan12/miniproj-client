import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { reservationDetails } from 'src/app/models/model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-user-profile-dropdowns',
  templateUrl: './user-profile-dropdowns.component.html',
  styleUrls: ['./user-profile-dropdowns.component.css']
})
export class UserProfileDropdownsComponent implements OnInit {

  resDetails: reservationDetails[] = []

  constructor(private reservationService: ReservationService, private fb: FormBuilder, private route: Router){ }

  ngOnInit(): void {
    this.reservationService.getReservationbyId()
      .then(result => {
        this.resDetails = result
      })
  }


  

}
