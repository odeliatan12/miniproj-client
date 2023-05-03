import { AgmMap, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { mealNames, mealRest } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mealsearch',
  templateUrl: './user-mealsearch.component.html',
  styleUrls: ['./user-mealsearch.component.css']
})
export class UserMealsearchComponent implements OnInit {

  title = 'FindThyCity';
  meals: mealNames[] = [];
  mealName = '';
  mealNames: string[] = [];
  mealRest: mealRest[] = []

  latitudeChild = 1.290270;
  longtitudeParent = 103.820268;

  constructor(private userService: UserService, private fb: FormBuilder, private adminService: AdminService, private route: Router){ }

  ngOnInit(): void {
    this.getMealNames()
  }

  getMealNames(){
    return this.adminService.getMeals()
      .subscribe(data => {
        if(data){
          this.meals = data
          this.meals.forEach(meals => {
            this.mealNames.push( meals.name )
          })
        }
      })
  }

  getInformation(request: string){
    this.userService.getMealRestInfo(request)
      .subscribe(data => {
        this.mealRest = data
      })
  }

  redirectToRestaurant(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

  calculateDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
    const earthRadius = 6371; // in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance * 1000; // convert to meters
  }
}
