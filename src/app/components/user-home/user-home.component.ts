import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantDetails } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  restaurant: RestaurantDetails[] = []

  constructor(private userSvc: UserService, private route: Router){ }

  ngOnInit(): void {

    this.userSvc.getAllRestaurants()
      .then(result => {
        console.log(result)
        return this.restaurant = result
      })
      
  }

  restaurantPage(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

}
