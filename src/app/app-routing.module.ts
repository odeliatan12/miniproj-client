import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { UserComponent } from './components/user/user.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserInsertreviewComponent } from './components/user-insertreview/user-insertreview.component';
import { UserAuthService } from './services/user-auth.service';
import { DealDetailsComponent } from './components/deal-details/deal-details.component';
import { AllDealsComponent } from './components/all-deals/all-deals.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'admin', component: AdminComponent, 
      children: [
        { path: 'restaurantList', component: RestaurantListComponent},
        { path: 'restaurantdetails', component: RestaurantDetailsComponent},
        { path: 'restaurant/:restaurantId', component: UpdateRestaurantComponent},
        { path: 'insertDeals/:restaurantId', component: DealDetailsComponent },
        { path: '', redirectTo: 'admin/restaurantList', pathMatch: 'full' }
      ]},
  { path: 'user', component: UserComponent,
      children: [
        { path: 'home', component: UserHomeComponent },
        { path: 'userReview/:restaurantId', component: UserReviewsComponent },
        { path: 'insertReview/:restaurantId', component: UserInsertreviewComponent },
        { path: 'allDeals', component: AllDealsComponent },
        { path: '', redirectTo: 'user/home', pathMatch: 'full' }
      ]},
  { path: '', redirectTo: 'user/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(private userAuth: UserAuthService){ }
  
}
