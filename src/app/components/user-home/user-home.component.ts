import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantDetails, cuisine, image } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  restaurant: RestaurantDetails[] = []
  image!: image
  imsgeSrc!: string[]
  chunkSize: number = 3;
  cuisine: cuisine[] = []

  constructor(private userSvc: UserService, private route: Router, private authService: UserAuthService, private adminService: AdminService){ }

  ngOnInit(): void {

    this.userSvc.getAllRestaurants()
      .then(result => {
        this.restaurant = result
        for(const r of this.restaurant){
          this.adminService.getImage(r.id)
            .then(imageData => {
              return r.restaurantLink = imageData
            })
        }
      })
    
    this.adminService.getCuisine()
      .then(result => {
        this.cuisine = result
      })
    
    if(this.authService.getRoles() === "ADMIN"){
      this.route.navigate(['/admin/restaurantList'])
    }
      
  }

  restaurantPage(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

  get carouselCardsChunks(): any[] {
    const chunks = [];
    for (let i = 0; i < this.restaurant.length; i += this.chunkSize) {
      chunks.push(this.restaurant.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  isLocationInNeighborhood(latitude: number, longitude: number, boundary: any[]): boolean {
    let inside = false;
    for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
      const xi = boundary[i][0], yi = boundary[i][1];
      const xj = boundary[j][0], yj = boundary[j][1];
      
      const intersect = ((yi > latitude) !== (yj > latitude)) &&
        (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

}
