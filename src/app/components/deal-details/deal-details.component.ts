import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categories, deals } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.css']
})
export class DealDetailsComponent implements OnInit {

  form!: FormGroup
  categories: categories[] = []

  constructor(private fb: FormBuilder, private dealsService: DealService, private activatedRoute: ActivatedRoute, private route: Router){ }

  ngOnInit(): void {
      this.form = this.createForm()
      this.getAllCategories()
        .then(result => {
          this.categories = result
       })
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ]),
      originalAmount: this.fb.control<number>(0, [ Validators.required ]),
      newAmount: this.fb.control<number>(0, [ Validators.required ]),
      quantity: this.fb.control<number>(0, [ Validators.required ]),
      category: this.fb.control<string>(''),
      mondayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      mondayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      tuesdayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      tuesdayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      wednesdayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      wednesdayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      thursdayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      thursdayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      fridayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      fridayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      saturdayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      saturdayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      sundayTo: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      sundayFrom: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
    })
  }

  getAllCategories(): Promise<categories[]>{
    return this.dealsService.getAllCategories()
  }

  postDeal(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    const value = this.form.value as deals
    console.log(value.mondayFrom)
    console.log(value.mondayTo)
    this.dealsService.insertNewDeal(value, restaurantId)
      .then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error)
        this.route.navigate(["/admin/restaurantList"])
      })
  }

}
