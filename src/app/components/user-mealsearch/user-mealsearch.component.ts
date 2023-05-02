import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private userService: UserService, private fb: FormBuilder, private adminService: AdminService){ }

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
        
      })
  }
}
