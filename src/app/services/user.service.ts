import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { Login, ResReviews, Restaurant, RestaurantDetails, UpdateUser, User, distance, googleLogin, image, mealRest, postReviews } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class UserService{

    RAILWAY_URL: string = "https://food-review-production.up.railway.app"

    // https://food-review-production.up.railway.app/api/auth/register
    // ${this.RAILWAY_URL}/api/auth/register

    constructor(private http: HttpClient, private userAuthService: UserAuthService){ }

    public register(registerData: Login): Promise<string>{
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' )
        return firstValueFrom(
            this.http.post<string>("https://food-review-production.up.railway.app/api/auth/register", registerData, { headers: headers })
        )
    }

    // obtain both the jwttoken and the role
    public login(loginData: Login): Promise<string> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' )
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/api/auth/login`, loginData, {headers: headers})
        )
    }

    // google register
    public googleRegister(credentials: string): Promise<googleLogin>{
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.post<googleLogin>(`${this.RAILWAY_URL}/api/auth/googleLogin`, credentials, {headers: headers})
        )
    }

    public getUserInfo(userId: any): Promise<User>{
        return firstValueFrom(
            this.http.get<User>(`${this.RAILWAY_URL}/user/` + userId)
        )
    }

    public getUserName(userId: any): Promise<string>{
        return firstValueFrom(
            this.http.get<User>(`${this.RAILWAY_URL}/user/` + userId)
        ).then(result => {
            return result.userName
        })
    }

    // Matching of role 
    public roleMatch(allowedRoles: string): boolean{
        let isMatch = false;
        const userRoles: any = this.userAuthService.getRoles();
        if (userRoles === allowedRoles) {
            isMatch = true;
            return isMatch;
        } else {
            return isMatch;
        }
    }

    // Get all Restaurants
    public getAllRestaurants(): Promise<RestaurantDetails[]>{
        return firstValueFrom(
            this.http.get<RestaurantDetails[]>(`${this.RAILWAY_URL}/allRestaurants`)
        )
    }

    // GetRestaurantbyCuisine
    public getRestaurantbyCuisine(cuisineId: number): Promise<RestaurantDetails[]>{
        return firstValueFrom(
            this.http.get<RestaurantDetails[]>(`${this.RAILWAY_URL}/restaurant/` + cuisineId)
        )
    }

    public getRestaurantbyId(restaurantId: number): Promise<ResReviews>{
        return firstValueFrom(
            this.http.get<ResReviews>(`${this.RAILWAY_URL}/restaurant/` + restaurantId)
        )
    }

    public postReview(reviews: postReviews,restaurantId: number): Promise<string>{
        const id = this.userAuthService.getUserId();
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/user/insertReview/` + id, reviews, { params: params })
        )
    }

    public getReviewCount(restaurantId: number): Promise<number>{
        return firstValueFrom(
            this.http.get<number>(`${this.RAILWAY_URL}/user/` + restaurantId + "/getReviewCount")
        )
    }

    // https://food-review-production.up.railway.app/meal/search?meals=egg%20roll
    public getMealRestInfo(request: string): Observable<mealRest[]>{
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' );
        const params = new HttpParams().set("meals", request)
        return this.http.get<mealRest[]>(`${this.RAILWAY_URL}/meal/search`, { params: params, headers: headers})
    }

    public getDistance(): Promise<distance[]>{
        return firstValueFrom(
            this.http.get<distance[]>(`${this.RAILWAY_URL}/meal/getDistance`)
        )
    }

    public updateUser(form: UpdateUser, id: string | null): Promise<string>{
        return firstValueFrom(
            this.http.put<string>(`${this.RAILWAY_URL}/user/updateUser/` + id, form)
        )
    }

    public getImage(id: number): Promise<any>{
        return firstValueFrom(
            this.http.get<image>(`${this.RAILWAY_URL}/image/` + id)
        ).then(result => {
            console.log(result.picture)
            const image = new Image()
            image.src = 'data:' + result.image_fileType + ';base64,' + result.picture
            return image.src 
        })
    }

    
}