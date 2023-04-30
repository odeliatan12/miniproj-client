import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { UserAuthService } from './services/user-auth.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { AdminService } from './services/admin.service';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserInsertreviewComponent } from './components/user-insertreview/user-insertreview.component';
import { DealDetailsComponent } from './components/deal-details/deal-details.component';
import { DealService } from './services/deals.service';
import { AllDealsComponent } from './components/all-deals/all-deals.component';
import { DealPagedetailsComponent } from './components/deal-pagedetails/deal-pagedetails.component';
import { PaypalbuttonComponent } from './components/paypalbutton/paypalbutton.component';
import { payPalService } from './services/paypal.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestaurantImageuploadComponent } from './components/restaurant-imageupload/restaurant-imageupload.component';
import { RestaurantMealUploadComponent } from './components/restaurant-meal-upload/restaurant-meal-upload.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    RestaurantDetailsComponent,
    UpdateRestaurantComponent,
    RestaurantListComponent,
    UserReviewsComponent,
    UserHomeComponent,
    UserInsertreviewComponent,
    DealDetailsComponent,
    AllDealsComponent,
    DealPagedetailsComponent,
    PaypalbuttonComponent,
    HeaderComponent,
    FooterComponent,
    RestaurantImageuploadComponent,
    RestaurantMealUploadComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), HttpClientModule, ReactiveFormsModule, RouterModule, BrowserAnimationsModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCIr56HQCyEkGEQb847eaN0I91kvG6PPDs',
      libraries: ['places']
    })
  ],
  providers: [ UserAuthService, UserService, AdminService,
    AuthInterceptor, AuthGuard, payPalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }, DealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
