import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant, RestaurantDetails, RestaurantPost, cuisine } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  form!: FormGroup;
  cuisine : cuisine[] = []
  formattedaddress=" ";
  options = {
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631)
    ),
    componentRestrictions:{
      country:"SG"
    },
    fields: [],
    origin: new google.maps.LatLng(0, 0),
    strictBounds: false,
    types: []
  }

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private userAuthService: UserAuthService, private route: Router){}

  ngOnInit(): void {
    this.form = this.createForm()
    this.adminSvc.getCuisine()
      .then(result => {
        this.cuisine = result
      })
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
     this.formattedaddress=address.formatted_address
  }
  
  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.min(5) ]),
      about: this.fb.control<string>('', [ Validators.required, Validators.min(10) ]),
      cuisineId: this.fb.control<number>(0),
      address: this.fb.control<string>('', Validators.required),
      contact: this.fb.control<string>(''),
      restaurantLink: this.fb.control<string>(''),
      menu: this.fb.control<string>(''),
      mondayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      mondayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      tuesdayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      tuesdayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      wednesdayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      wednesdayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      thursdayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      thursdayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      fridayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      fridayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      saturdayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      saturdayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      sundayOpening: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
      sundayClosing: this.fb.control<string>('', Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)),
    })
  }

  saveRestaurant(){
    const value = this.form.value as RestaurantPost
    value.address = this.formattedaddress

    this.adminSvc.saveRestaurant(value)
      .then( result => 
        console.log(result)
      ).catch( error => 
        console.log(error)  
      )
  }

}
