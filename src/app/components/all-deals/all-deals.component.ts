import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allDeals } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';
import { UserService } from 'src/app/services/user.service';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-all-deals',
  templateUrl: './all-deals.component.html',
  styleUrls: ['./all-deals.component.css']
})
export class AllDealsComponent implements OnInit {

  allDeals: allDeals[] = []

  constructor(private dealService: DealService, private route: Router, private userService: UserService){ }

  ngOnInit(): void {
      this.dealService.getAllDeals()
        .then(result => {
          this.allDeals = result
          for(const r of this.allDeals){
          this.userService.getImage(r.restaurantId)
            .then(imageData => {
              return r.saturdayFrom = imageData
            })
        }
        }).catch(error => {
          console.log(error)
        })
  }

  goToDealPage(idx: string){
    this.route.navigate(["user/deals", idx])
  }

}
