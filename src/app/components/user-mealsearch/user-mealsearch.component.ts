// import { AgmInfoWindow, AgmMap, AgmMarker, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { distance, location, mealNames, mealRest } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-user-mealsearch',
  templateUrl: './user-mealsearch.component.html',
  styleUrls: ['./user-mealsearch.component.css']
})
export class UserMealsearchComponent implements OnInit {

  form!: FormGroup
  meals: mealNames[] = [];
  mealNames: string[] = [];
  mealRest: mealRest[] = []
  markers: location[] = []
  image!: string 
  selectedMarker!: location
  showMealName!: boolean 
  mapOptions!: google.maps.MapOptions;

  public showMap: boolean = false;

  zoom: any
  lat: any
  lng: any
  getAddresses: any
  longitude: any
  latitude: any
  currentLocation: string | undefined;
  distance: distance[] = []

  constructor(private userService: UserService, private fb: FormBuilder, private adminService: AdminService, private route: Router 
    ){ }

  ngOnInit(): void {
    this.getMealNames()
    this.getUserLocation()
    this.userService.getDistance()
      .then(result => {
        this.distance = result;
      })
    this.form = this.createForm()
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

  createForm(){
    return this.fb.group({
      meal: this.fb.control<string>(''),
      distance: this.fb.control<number>(0),
      // price: this.fb.control<number>(0)
    })
  }

  findMeal(){
    const value = this.form.value
    console.log(value.meal)
    console.log(value.distance)
    this.getInformation(value.meal, value.distance)
  }

  getInformation(request: string, d: number){
    this.userService.getMealRestInfo(request)
      .subscribe(data => {
        this.mealRest = data
        this.mealRest.forEach(m => {
          const distance = this.calculateDistance(this.latitude, this.longitude, m.latitude, m.longitude)

          if(distance <= d){
            const marker: location = {
              latitude: m.latitude,
              longitude: m.longitude,
              restaurant_name: m.restaurant_name
            };
            this.markers.push(marker);
          }
        });
        console.log(this.markers)
        this.showMap = true;
      })
  }

  redirectToRestaurant(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            this.latitude = position.coords.latitude,
            this.longitude = position.coords.longitude
            this.mapOptions = {
              center: { lat: this.latitude, lng: this.longitude }, // Set the initial map center
              zoom: 12, // Set the initial zoom level
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
        },
        (error) => {
          console.log('Error getting user location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getAddress() {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: this.lat, lng: this.lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          this.currentLocation = results[0].formatted_address;
          console.log('Current location:', this.currentLocation);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  calculateDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
    const earthRadius = 6371; // in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance * 1000; // convert to meters
  }

}

  


  // get(){
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       if (position) {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.getAddress=(this.lat,this.lng)
  //       console.log(position)
  
  //       this.apiLoader.load().then(() => {
  //         let geocoder = new google.maps.Geocoder;
  //         let latlng = {lat: this.lat, lng: this.lng};
         
  //         geocoder.geocode({'location': latlng}, (results) => {
  //             if (results[0]) {
  //               this.currentLocation = results[0].formatted_address;
               
  //             console.log(this.assgin);
  //             } else {
  //               console.log('Not found');
  //             }
  //           });
  //         });
  //       }
  //     })
  //   }
  
  // }
  // assgin(assgin: any) {
  //   throw new Error('Method not implemented.');
  // }

  // mapClicked($event: google.maps.MapMouseEvent) {

  //   this.latitude= $event.latLng.lat(),
  //   this.longitude= $event.latLng.lng()
  
    
  //   this.apiLoader.load().then(() => {
  //     let geocoder = new google.maps.Geocoder;
  //     let latlng = {lat: this.latitude, lng: this.longitude};
    
  //     geocoder.geocode({'location': latlng}, (results) => {
  //         if (results[0]) {
  //           this.currentLocation = results[0].formatted_address;
  //         console.log(this.currentLocation);
  //         } else {
  //           console.log('Not found');
  //         }
  //     });
  //   });
  // }

  
