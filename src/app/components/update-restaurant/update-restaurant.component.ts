import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Restaurant, RestaurantDetails, cuisine } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  form!: FormGroup

  restDetails!: RestaurantDetails
  cuisine!: string
  cuisines: cuisine[] = []

  latitude!: number;
  longitude!: number;
  selectedAddress!: string;

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

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private activatedRoute: ActivatedRoute, private route: Router, private userAuth: UserAuthService, private utilService: UtilsService){ }

  ngOnInit(): void {

    // this.userAuth.getAuthentication()

    this.getRestaurantDetails()
      .then( result => {
        this.restDetails = result
        this.adminSvc.getCuisinebyId(this.restDetails.cuisine_id)
          .then(result => {
            this.cuisine = result
          })
        this.adminSvc.getCuisine()
          .then(result => {
            this.cuisines = result
          })
        this.form.patchValue({
          name: this.restDetails.name,
          about: this.restDetails.about,
          contact: this.restDetails.contact,
          restaurantLink: this.restDetails.restaurantLink,
          address: this.restDetails.address,
          cuisine_id: this.restDetails.cuisine_id,
          menu: this.restDetails.menu,
          mondayOpening: (this.restDetails.mondayOpening).slice(0,5),
          mondayClosing: (this.restDetails.mondayClosing).slice(0,5),
          tuesdayOpening: (this.restDetails.tuesdayOpening).slice(0,5),
          tuesdayClosing: (this.restDetails.tuesdayClosing).slice(0,5),
          wednesdayOpening: (this.restDetails.wednesdayOpening).slice(0,5),
          wednesdayClosing: (this.restDetails.wednesdayClosing).slice(0,5),
          thursdayOpening: (this.restDetails.thursdayOpening).slice(0,5),
          thursdayClosing: (this.restDetails.thursdayClosing).slice(0,5),
          fridayOpening: (this.restDetails.fridayOpening).slice(0,5),
          fridayClosing: (this.restDetails.fridayClosing).slice(0,5),
          saturdayOpening: (this.restDetails.saturdayOpening).slice(0,5),
          saturdayClosing: (this.restDetails.saturdayClosing).slice(0,5),
          sundayOpening: (this.restDetails.sundayOpening).slice(0,5),
          sundayClosing: (this.restDetails.sundayClosing).slice(0,5),
        })
      }).catch ( error => {
        console.log(error)
      })

    this.form = this.createForm()
  }

  getRestaurantDetails(): Promise<RestaurantDetails>{
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    return this.adminSvc.getRestaurantDetails(restaurantId)
  }

  updateRestaurant(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    const value = this.form.value
    this.adminSvc.updateRestaurant(value, restaurantId)
      .then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error)

        this.utilService.basicSweetAlert("Restaurant details is now updated", 3000, "success", this.route.navigate(["/admin/restaurantList"]))
        
      })
  }

  handleAddressChange(address: Address) {
    console.log(address.formatted_address)
    console.log(address.geometry.location.lat())
    console.log(address.geometry.location.lng())
    this.selectedAddress = address.formatted_address;
    this.latitude = address.geometry.location.lat()
    this.longitude = address.geometry.location.lng()
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.min(5) ]),
      about: this.fb.control<string>('', [ Validators.required, Validators.min(10) ]),
      contact: this.fb.control<string>(''),
      restaurantLink: this.fb.control<string>(''),
      menu: this.fb.control<string>(''),
      address: this.fb.control<string>(""),
      cuisineId: this.fb.control<number>(1),
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


}
