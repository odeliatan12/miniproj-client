import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantDetails, image } from 'src/app/models/model';
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

  constructor(private userSvc: UserService, private route: Router, private authService: UserAuthService, public adminService: AdminService){ }

  ngOnInit(): void {

    this.userSvc.getAllRestaurants()
      .then(result => {
        console.log(result)
        this.restaurant = result
        for(const r of this.restaurant){
          this.adminService.getImage(r.id)
            .then(imageData => {
              return r.restaurantLink = imageData
            })
        }
      })
    
    if(this.authService.getRoles() === "ADMIN"){
      this.route.navigate(['/admin/restaurantList'])
    }
      
  }

  restaurantPage(idx: number){
    this.route.navigate(['/user/userReview', idx])
  }

}
