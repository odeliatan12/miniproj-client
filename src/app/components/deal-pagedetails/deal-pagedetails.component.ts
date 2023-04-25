import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResReviews, RestaurantDetails, allDeals } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deal-pagedetails',
  templateUrl: './deal-pagedetails.component.html',
  styleUrls: ['./deal-pagedetails.component.css']
})
export class DealPagedetailsComponent implements OnInit {

  deal: allDeals[] = []
  restaurantDetails!: ResReviews

  constructor(private activatedRoute: ActivatedRoute, private dealService: DealService, private route: Router, private userService: UserService){ }

  ngOnInit(): void {
    this.getDealbyRestaurantId()
      .then(result => {
        this.deal = result
        for(const r of result){
          this.getRestaurantDetails(r.restaurantId)
            .then(result => {
              this.restaurantDetails = result
            }).catch(error => {
              console.log(error)
              this.route.navigate(["/user/allDeals"])
            })
        }
      }).catch(error => {
        console.log(error)
        this.route.navigate(["/user/allDeals"])
      })
  }

  getDealbyRestaurantId(): Promise<allDeals[]>{
    const dealId = this.activatedRoute.snapshot.params["dealId"]
    return this.dealService.getDeal(dealId)
  }

  getRestaurantDetails(idx: number): Promise<ResReviews>{
    return this.userService.getRestaurantbyId(idx)
  }

}
