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

  mealRest: mealRest[] = []
  form!: FormGroup
  filteredOptions: mealNames[] = []
  options: mealNames[] = []
  mealsControl = new FormControl();
  filteredMeals!: Observable<string[]>;

  constructor(private userService: UserService, private fb: FormBuilder, private adminService: AdminService){ }

  ngOnInit(): void {
      this.getResult()
      this.form = this.createForm()
      this.initForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      mealNames : this.fb.control<string>('')
    })
  }

  initForm(){
    this.filteredMeals = this.mealsControl.valueChanges
    .pipe(
      debounceTime(300),
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      // have to resolve this
    )
  }

  filter(name: string): Observable<string[]> {
    const filterValue = name.toLowerCase();
    return this.adminService.getMeals().pipe(
      map(options => options.map(option => option.name.toLowerCase())),
      map(options => options.filter(option => option.includes(filterValue)))
    )
  }

  displayFn(meal: string): string {
    return meal ? meal : '';
  }

  getResult(){
    this.adminService.getAllMeals()
      .then(response => {
        this.options = response;
        this.filteredOptions = response
      })
  }

}
