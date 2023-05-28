import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResReviews, cuisine, cuisineType, reservation, timing } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  form!: FormGroup
  resReviews!: ResReviews
  image!: string
  number!: number
  timing: timing[] = []
  cuisine!: cuisineType
  
  constructor(private activatedRoute: ActivatedRoute, private route: Router, public userSvc: UserService, private adminSvc: AdminService, private fb: FormBuilder, private reservationService: ReservationService, private utilService: UtilsService){ }

  ngOnInit(): void {

    this.getRestaurantDetails()
      .then(result => {
        this.resReviews = result
        this.resReviews.restaurant.mondayOpening = (result.restaurant.mondayOpening).slice(0,5),
        this.resReviews.restaurant.mondayClosing = (result.restaurant.mondayClosing).slice(0,5),
        this.resReviews.restaurant.tuesdayOpening = (result.restaurant.tuesdayOpening).slice(0,5),
        this.resReviews.restaurant.tuesdayClosing = (result.restaurant.tuesdayClosing).slice(0,5),
        this.resReviews.restaurant.wednesdayOpening = (result.restaurant.wednesdayOpening).slice(0,5),
        this.resReviews.restaurant.wednesdayClosing = (result.restaurant.wednesdayClosing).slice(0,5),
        this.resReviews.restaurant.thursdayOpening = (result.restaurant.thursdayOpening).slice(0,5),
        this.resReviews.restaurant.thursdayClosing = (result.restaurant.thursdayClosing).slice(0,5),
        this.resReviews.restaurant.fridayOpening = (result.restaurant.fridayOpening).slice(0,5),
        this.resReviews.restaurant.fridayClosing = (result.restaurant.fridayClosing).slice(0,5),
        this.resReviews.restaurant.saturdayOpening = (result.restaurant.saturdayOpening).slice(0,5),
        this.resReviews.restaurant.saturdayClosing = (result.restaurant.saturdayClosing).slice(0,5),
        this.resReviews.restaurant.sundayOpening = (result.restaurant.sundayOpening).slice(0,5),
        this.resReviews.restaurant.sundayClosing = (result.restaurant.sundayClosing).slice(0,5)
        for(const r of this.resReviews.reviews){
          r.timestamp = this.formatDate(r.timestamp.slice(0,10))
        }
      }).then(result => {
        this.getCuisine()
      }).catch(error => {
        this.route.navigate(["/user/home"])
      })

    this.adminSvc.getImage(this.activatedRoute.snapshot.params["restaurantId"])
      .then(result => {
        this.image = result
      })

    this.userSvc.getReviewCount(this.activatedRoute.snapshot.params["restaurantId"])
      .then(result => {
        this.number = result
      })
      
    this.form = this.createForm()
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      pax: this.fb.control<number>(0, [ Validators.required, Validators.min(1)]),
      timeReserve: this.fb.control<string>(''),
      dateReserve: this.fb.control<string>('', [ Validators.required, this.futureDateValidator(), this.NotAboveYear2200() ])
    })
  }

  getRestaurantDetails(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    return this.userSvc.getRestaurantbyId(restaurantId)
  }

  getCuisine(){
    const cuisineId = this.resReviews.restaurant.cuisine_id
    this.adminSvc.getCuisineString(cuisineId)
      .then(result => {
        console.log(result)
        this.cuisine = result
      })
  }

  insertReview(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    this.route.navigate(["/user/insertReview", restaurantId])
  }

  insertReservation(){
    const value = this.form.value as reservation
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    this.reservationService.insertReservation(this.activatedRoute.snapshot.params["restaurantId"], value)
      .then(result => {
        // this.route.navigate(["/user/insertReview", restaurantId])
      }).catch(result => {
        this.utilService.basicSweetAlert("Restaurant details is now updated", 3000, "success", this.route.navigate(["/user/profile"]))
        window.location.reload
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

  futureDateValidator(): any | null{
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }

  formatDate(dateString: string){
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return `${day} ${monthNames[monthIndex]} ${year}`
  }

  NotAboveYear2200(): any | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const maxYear = 2200;
  
      if (selectedDate < currentDate || selectedDate.getFullYear() > maxYear) {
        return { NotAboveYear2200: true };
      }
  
      return null;
    };
  }

  range(max: number): number[] {
    return Array.from({ length: max }, (_, index) => index);
  }

  fireSweetAlert(){
    Swal.fire({
      template: '#my-template'
    })
  }
}
