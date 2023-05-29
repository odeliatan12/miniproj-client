import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';
import { RestaurantDetails } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { SearchService } from 'src/app/services/search.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results!: any;
  searchTerm$ = new Subject<string>();
  restaurant: RestaurantDetails[] = []
  @ViewChild('navbarCollapse') 
  navbarCollapse!: ElementRef;
  form!: FormGroup


  constructor( private userAuthService: UserAuthService,
    private router: Router, public userService: UserService, private adminService: AdminService, private fb: FormBuilder, private route: Router){
    
  }
  
  ngOnInit(): void {

    this.form = this.createForm()
    this.getMealInfo()
    
  }
  
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  public routerUrl(link: string){
    window.location.reload()
    return this.router.navigate([link]);
  }

  createForm(){
    return this.fb.group({
      restaurant: this.fb.control<number>(0)
    })
  }

  navigateToRestaurant(){
    const value = this.form.value
    this.route.navigate(['/user/userReview', value.restaurant])
  }


  openSweetModal(){
    Swal.fire({
      template: '#my-template2'
    })
  }

  getMealInfo(){
    this.userService.getAllRestaurants()
      .then(result => {
        this.restaurant = result
        for(const r of this.restaurant){
          this.adminService.getCuisinebyId(r.cuisine_id)
            .then(result => {
              r.menu = result 
            })
        }
      })
  }


}
