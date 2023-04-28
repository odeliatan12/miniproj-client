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
  imsgeSrc!: string

  constructor(private userSvc: UserService, private route: Router, private authService: UserAuthService, private adminService: AdminService){ }

  ngOnInit(): void {

    this.userSvc.getAllRestaurants()
      .then(result => {
        console.log(result)
        this.restaurant = result
        for(const r of result){
          console.log(r.id)
          this.adminService.getImage(r.id)
            .then(result => {
              this.image = result
              console.log(this.image.picture)
              const image = new Image()
              this.imsgeSrc = 'data:' + this.image.image_fileType + ';base64,' + this.image.picture
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
