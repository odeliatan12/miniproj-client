import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
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
import { UserMealsearchComponent } from './components/user-mealsearch/user-mealsearch.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterpipePipe } from './pipe/filterpipe.pipe';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SearchService } from './services/search.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RestaurantCapacityComponent } from './components/restaurant-capacity/restaurant-capacity.component';
import { ReservationService } from './services/reservation.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleLoginComponent } from './components/google-login/google-login.component';


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
    UserMealsearchComponent,
    FilterpipePipe,
    UserProfileComponent,
    RestaurantCapacityComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), HttpClientModule, ReactiveFormsModule, RouterModule, FormsModule, MatInputModule, MatAutocompleteModule, BrowserAnimationsModule, GoogleMapsModule, GooglePlaceModule, SocialLoginModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ UserAuthService, UserService, AdminService,
    AuthInterceptor, AuthGuard, payPalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }, DealService, SearchService, ReservationService, {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('833064911004-809r50phgjvm0p084vsbhk60un9dbc5j.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
