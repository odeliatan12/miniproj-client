import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleCalendar, reservationDetails } from 'src/app/models/model';
import { ReservationService } from 'src/app/services/reservation.service';
import 'add-to-calendar-button';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
// import 'add-to-calendar-button/assets/css/atcb.css';

@Component({
  selector: 'app-user-profile-googlecalander',
  templateUrl: './user-profile-googlecalander.component.html',
  styleUrls: ['./user-profile-googlecalander.component.css']
})
export class UserProfileGooglecalanderComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
      atcb_init
  }

  ngOnInit(): void {

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
    const event = new GoogleCalendar(this.idx, value.summary, this.location, value.description, this.date, this.startTiming, this.endTiming);
    this.reservationService.googleEvent(event)
  }
}
