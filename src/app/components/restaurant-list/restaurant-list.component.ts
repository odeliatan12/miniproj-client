import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurant: Restaurant[] = []

  constructor(private adminSvc: AdminService, public userAuthSvc: UserAuthService, private route: Router){ }

  ngOnInit(): void {
    
    this.getRestaurant()
      .then( result => {
        console.log(result)
        return this.restaurant = result
      })
      
  }

  deleteRestaurant(idx: number){

  }
  
  updateRestaurant(idx: number){
    this.route.navigate(["/admin/restaurant/" , idx])
  }

  getRestaurant(){
    const userId = this.userAuthSvc.getUserId() ?? '';
    return this.adminSvc.getRestaurants(userId)
  }

}
