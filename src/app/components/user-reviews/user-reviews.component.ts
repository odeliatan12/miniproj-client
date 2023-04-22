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

    // this.getRestaurantDetails()
    //   .then(result => {
    //     this.resReviews = result
    //   }).catch(error => {
    //     console.log(error)
    //     this.route.navigate(["/user/home"])
    //   })
      
  }

  getRestaurantDetails(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    return this.userSvc.getRestaurantbyId(restaurantId)
  }


}
