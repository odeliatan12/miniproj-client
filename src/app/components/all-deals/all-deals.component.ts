import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allDeals } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-all-deals',
  templateUrl: './all-deals.component.html',
  styleUrls: ['./all-deals.component.css']
})
export class AllDealsComponent implements OnInit {

  allDeals: allDeals[] = []

  constructor(private dealService: DealService, private route: Router){ }

  ngOnInit(): void {
      this.dealService.getAllDeals()
        .then(result => {
          this.allDeals = result
        }).catch(error => {
          console.log(error)
        })
  }

  goToDealPage(idx: string){
    this.route.navigate(["user/deals", idx])
  }

}
