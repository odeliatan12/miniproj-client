import { AgmMap, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-mealmap',
  templateUrl: './user-mealmap.component.html',
  styleUrls: ['./user-mealmap.component.css']
})
export class UserMealmapComponent implements OnInit {

  @ViewChild(AgmMap,{static: true}) 
  public agmMap: AgmMap | undefined;
  zoom: any
  lat: any
  lng: any
  getAddress: any
  longitude: any
  latitude: any
  currentLocation: string | undefined;

  constructor(private apiLoader: MapsAPILoader){ }

  ngOnInit(): void {

    this.get()
    this.agmMap?.triggerResize(true)
    this.zoom = 16;
      
    
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



}
