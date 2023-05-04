import { AgmMap, AgmMarker, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { location, mealNames, mealRest } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mealsearch',
  templateUrl: './user-mealsearch.component.html',
  styleUrls: ['./user-mealsearch.component.css']
})
export class UserMealsearchComponent implements OnInit {


  meals: mealNames[] = [];
  mealName = '';
  mealNames: string[] = [];
  mealRest: mealRest[] = []
  markers: location[] = []
  latitudeChild = 1.290270;
  longtitudeParent = 103.820268;

  public agmMap: AgmMap | undefined;
  public showMap: boolean = false;

  zoom: any
  lat: any
  lng: any
  getAddress: any
  longitude: any
  latitude: any
  currentLocation: string | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private adminService: AdminService, private route: Router, private apiLoader: MapsAPILoader){ }

  ngOnInit(): void {
    this.getMealNames()
    this.get()
    this.agmMap?.triggerResize(true)
    this.zoom = 16;
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

  getInformation(request: string){
    this.userService.getMealRestInfo(request)
      .subscribe(data => {
        this.mealRest = data
        this.mealRest.forEach(m => {
          const marker: location = {
            latitude: m.latitude,
            longitude: m.longitude
          };
          this.markers.push(marker);
        });
        console.log(this.markers)
        this.showMap = true;
      })
  }

  redirectToRestaurant(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

  get(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getAddress=(this.lat,this.lng)
        console.log(position)
  
        this.apiLoader.load().then(() => {
          let geocoder = new google.maps.Geocoder;
          let latlng = {lat: this.lat, lng: this.lng};
         
          geocoder.geocode({'location': latlng}, (results) => {
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
               
              console.log(this.assgin);
              } else {
                console.log('Not found');
              }
            });
          });
        }
      })
    }
  
  }
  assgin(assgin: any) {
    throw new Error('Method not implemented.');
  }

  mapClicked($event: google.maps.MapMouseEvent) {

    this.latitude= $event.latLng.lat(),
    this.longitude= $event.latLng.lng()
  
    
    this.apiLoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {lat: this.latitude, lng: this.longitude};
    
      geocoder.geocode({'location': latlng}, (results) => {
          if (results[0]) {
            this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
          } else {
            console.log('Not found');
          }
      });
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
