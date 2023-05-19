import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleCalendar, reservationDetails } from 'src/app/models/model';
import { ReservationService } from 'src/app/services/reservation.service';
import 'add-to-calendar-button';

@Component({
  selector: 'app-user-profile-googlecalander',
  templateUrl: './user-profile-googlecalander.component.html',
  styleUrls: ['./user-profile-googlecalander.component.css']
})
export class UserProfileGooglecalanderComponent implements OnInit {

  form!: FormGroup

  @Input()
  nameofRestaurant!: string
  @Input()
  idx!: number
  @Input()
  location!: string
  @Input()
  startTiming!: string
  @Input()
  endTiming!: string
  @Input()
  date!: string
  @Input()
  contact!: string


  reservation!: reservationDetails

  constructor(private fb: FormBuilder, private reservationService: ReservationService){ }

  ngOnInit(): void {

    console.log(this.idx)
    // this.reservationService.getReservation(this.idx)
    //   .then(result => {
    //     this.reservation = result
    //   })
    
    this.form = this.createForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      summary: this.fb.control<string>(''),
      description: this.fb.control<string>(''),
    })
  }

  createGoogleEvent(){
    const value = this.form.value
    console.log(value.description)
    const event = new GoogleCalendar(this.idx, value.summary, this.location, value.description, this.date, this.startTiming, this.endTiming);
    this.reservationService.googleEvent(event)
  }
}
