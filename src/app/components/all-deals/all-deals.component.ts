import { Component, OnInit } from '@angular/core';
import { allDeals } from 'src/app/models/model';
import { DealService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-all-deals',
  templateUrl: './all-deals.component.html',
  styleUrls: ['./all-deals.component.css']
})
export class AllDealsComponent implements OnInit {

  allDeals: allDeals[] = []

  constructor(private dealService: DealService){ }

  ngOnInit(): void {
      
  }

}
