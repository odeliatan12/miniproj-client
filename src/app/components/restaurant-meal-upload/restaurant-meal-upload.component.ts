import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mealNames, meals } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-restaurant-meal-upload',
  templateUrl: './restaurant-meal-upload.component.html',
  styleUrls: ['./restaurant-meal-upload.component.css']
})
export class RestaurantMealUploadComponent implements OnInit {

  form!: FormGroup
  mealNames: mealNames[] = []
  mealCategories: mealNames[] = []
  meals: meals[] = []

  constructor(private adminService: AdminService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router ){ }

  ngOnInit(): void {
    this.adminService.getAllMeals()
      .then(result => {
        console.log(result)
        this.mealNames = result
      })
    this.adminService.getAllCategories()
      .then(result => {
        this.mealCategories = result
      })
    this.form = this.createForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<number>(0),
      category: this.fb.control<number>(0),
      amount: this.fb.control<number>(0)
    })
  }

  addFormArray(){
    const g = this.form.value
    const meal = new meals(this.activatedRoute.snapshot.params["restaurantId"], g.name, g.category, g.amount)
    return this.meals.push(meal)
  }

  saveForm(){
    console.log(this.meals)
    this.adminService.postListofDishes(this.meals)
      .then(result => {
        console.log(result)
      }).catch(error => {
        this.route.navigate(["/admin/restaurantList"])
      })
  }

  deleteForm(idx: number){
    this.meals.splice(idx, 1);
  }

}