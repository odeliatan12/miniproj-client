import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { capacity } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-restaurant-capacity',
  templateUrl: './restaurant-capacity.component.html',
  styleUrls: ['./restaurant-capacity.component.css']
})
export class RestaurantCapacityComponent implements OnInit {

  form!: FormGroup
  capacities: capacity[] = []

  constructor(private fb: FormBuilder, private adminService: AdminService, private activatedRoute: ActivatedRoute, private route: Router, private userAuth: UserAuthService, private utilsService: UtilsService){ }

  ngOnInit(): void {

    this.form = this.createForm()
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      capacity: this.fb.control<number>(0),
      starttiming: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      endtiming: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/))
    })
  }

  addFormArray(){
    const g = this.form.value
    const c = new capacity(g.capacity, g.starttiming, g.endtiming, this.activatedRoute.snapshot.params["restaurantId"])
    return this.capacities.push(c)
  }

  saveForm(){
    console.log(this.capacities)
    this.adminService.postCapacity(this.capacities)
      .then(result => {
        console.log(result)
      }).catch(result => {
        this.utilsService.basicSweetAlert("Details are now updated", 3000, "success", this.route.navigate(["/admin/restaurantList"]))
      })
  }

  deleteForm(idx: number){
    this.capacities.splice(idx, 1);
  }

}
