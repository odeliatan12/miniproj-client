import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mealNames } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-restaurant-meal-upload',
  templateUrl: './restaurant-meal-upload.component.html',
  styleUrls: ['./restaurant-meal-upload.component.css']
})
export class RestaurantMealUploadComponent implements OnInit {

  form!: FormGroup
  mealNames: mealNames[] = []

  constructor(private adminService: AdminService, private fb: FormBuilder ){ }

  ngOnInit(): void {
    this.adminService.getAllMeals()
      .then(result => {
        this.mealNames = result
      })
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>(''),
      amount: this.fb.control<number>(0)
    })
  }

}
