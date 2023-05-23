import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allDeals, categories } from 'src/app/models/model';
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
  chunkSize: number = 3;
  categories: categories[] = []
  carouselChunks: any[] = []

  constructor(private dealService: DealService, private route: Router, private userService: UserService){ }

  ngOnInit(): void {

      // this.dealService.getAllDeals()
      //   .then(result => {
      //     this.allDeals = result
          
      //     for(const r of this.allDeals){
      //       const imagePromises = this.userService.getImage(r.restaurantId)
      //       .then(imageData => {
      //         return r.saturdayFrom = imageData
      //       })
      //     }
      //   })
    this.dealService.getAllDeals()
      .then(result => {
        this.allDeals = result
        
        const imagePromises = this.allDeals.map(r => {
          this.userService.getImage(r.restaurantId)
            .then(imageData => {
              return r.saturdayFrom = imageData
            })
        })
        return Promise.all(imagePromises)

      }).then(() => {
        // Categorize restaurants based on the 'category' property
        this.categories = this.categorizeRestaurants(this.allDeals);

        // Generate carousel card chunks
        this.carouselChunks = this.generateCarouselChunks(this.allDeals);

        return this.getDealsbyCategory();
      })
  }

  goToDealPage(idx: string){
    this.route.navigate(["user/deals", idx])
  }

  generateCarouselChunks(restaurants: any[]): any[] {
    const chunks = [];
    for (let i = 0; i < restaurants.length; i += this.chunkSize) {
      chunks.push(restaurants.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  getDealsbyCategory(){
    this.dealService.getAllCategories()
      .then(result => {
        this.categories = result

        const categoryPromises = this.categories.map(category => {
          return this.dealService.getDealbyCategory(category.category)
            .then(result => {
              const categorizedDeals = this.categorizeRestaurants(result);
              category.category = categorizedDeals;
            });
        });
  
        return Promise.all(categoryPromises);
      })
  }

  categorizeRestaurants(restaurants: any[]): any {

    // Categorize deals based on the 'category' property
    const categorizedRestaurants = restaurants.reduce((categories, restaurant) => {
      const category = restaurant.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(restaurant);
      return categories;
    }, {});

    // Convert the categorized restaurants into an array of categories
    const categories = Object.keys(categorizedRestaurants).map(category => ({
      name: category,
      category: categorizedRestaurants[category]
    }));

    return categories;
  }

}
