import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResReviews } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

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
  
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private userSvc: UserService, private adminSvc: AdminService, private fb: FormBuilder){ }

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
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      timeReserve: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      dateReserve: this.fb.control<string>('')
    })
  }

  getRestaurantDetails(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    return this.userSvc.getRestaurantbyId(restaurantId)
  }

  insertReview(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    this.route.navigate(["/user/insertReview", restaurantId])
  }


}
