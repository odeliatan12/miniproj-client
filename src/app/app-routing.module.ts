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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'admin', component: AdminComponent, 
      children: [
        { path: 'restaurantList', component: RestaurantListComponent},
        { path: 'restaurantdetails', component: RestaurantDetailsComponent},
        { path: 'restaurant/:restaurantId', component: UpdateRestaurantComponent},
        { path: '', redirectTo: 'admin', pathMatch: 'full' }
      ]},
  { path: 'user', component: UserComponent,
      children: [
        { path: 'userReview', component: UserReviewsComponent },
        { path: '', redirectTo: 'user', pathMatch: 'full' }
      ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
