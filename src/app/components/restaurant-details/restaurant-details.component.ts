import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  @ViewChild('file')
  image: ElementRef | undefined;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private userAuthService: UserAuthService, private route: Router){}

  ngOnInit(): void {
    this.form = this.createForm()
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

  saveRestaurant(){
    const value = this.form.value
    console.log(value.name)
    const formData = new FormData();
    formData.set('name', value.name)
    formData.set('about', value.about)
    formData.set('contact', value.contact)
    formData.set('restaurantLink', value.restaurantLink)
    formData.set('menu', value.menu)
    formData.set('image', this.image?.nativeElement.files[0])
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

    this.adminSvc.saveRestaurant(formData)
      .then( result => 
        console.log(result)
      ).catch( error => 
        console.log(error)  
      )
  }

}
