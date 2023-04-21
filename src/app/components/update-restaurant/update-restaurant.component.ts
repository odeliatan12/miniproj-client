import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantDetails } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  form!: FormGroup
  selectedImage!: File;

  @ViewChild('file')
  image: ElementRef | undefined;

  restDetails!: RestaurantDetails

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private activatedRoute: ActivatedRoute, private route: Router){ }

  ngOnInit(): void {
    this.getRestaurantDetails()
      .then( result => {
        this.restDetails = result
        this.form.patchValue({
          name: this.restDetails.name,
          about: this.restDetails.about,
          contact: this.restDetails.contact,
          restaurantLink: this.restDetails.restaurantLink,
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

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
  }

  updateRestaurant(){
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    const value = this.form.value
    console.log(value.name)
    const formData = new FormData();
    formData.set('name', value.name)
    formData.set('about', value.about)
    formData.set('contact', value.contact)
    formData.set('restaurantLink', value.restaurantLink)
    formData.set('menu', value.menu)
    if (this.selectedImage) {
      formData.set('image', this.selectedImage);
    } else {
      formData.set('image', "null")
    }
    formData.set('mondayOpening', value.mondayOpening)
    formData.set('mondayClosing', value.mondayClosing)
    formData.set('tuesdayOpening', value.tuesdayOpening)
    formData.set('tuesdayClosing', value.tuesdayClosing)
    formData.set('wednesdayOpening', value.wednesdayOpening)
    formData.set('wednesdayClosing', value.wednesdayClosing)
    formData.set('thursdayOpening', value.thursdayOpening)
    formData.set('thursdayClosing', value.thursdayClosing)
    formData.set('fridayOpening', value.fridayOpening)
    formData.set('fridayClosing', value.fridayClosing)
    formData.set('saturdayOpening', value.saturdayOpening)
    formData.set('saturdayClosing', value.saturdayClosing)
    formData.set('sundayOpening', value.sundayOpening)
    formData.set('sundayClosing', value.sundayClosing)
    this.adminSvc.updateRestaurant(formData, restaurantId)
      .then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error)
        this.route.navigate(["/admin/restaurantList"])
      })
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.min(5) ]),
      about: this.fb.control<string>('', [ Validators.required, Validators.min(10) ]),
      contact: this.fb.control<string>(''),
      restaurantLink: this.fb.control<string>(''),
      menu: this.fb.control<string>(''),
      image: this.fb.control(''),
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
