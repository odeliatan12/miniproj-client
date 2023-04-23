import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResReviews } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  resReviews!: ResReviews
  
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private userSvc: UserService){ }

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
        console.log(error)
        this.route.navigate(["/user/home"])
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
