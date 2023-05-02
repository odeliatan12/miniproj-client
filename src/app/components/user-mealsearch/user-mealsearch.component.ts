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
}
