import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, firstValueFrom } from "rxjs";
import { Restaurant, RestaurantDetails, RestaurantPost, capacity, cuisine, cuisineType, image, mealNames, meals } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class AdminService{

    // https://food-review-production.up.railway.app/admin/cuisine
    RAILWAY_URL: string = "https://food-review-production.up.railway.app"

    constructor(private http: HttpClient, private userAuth: UserAuthService){ }

    public saveRestaurant(form: RestaurantPost): Promise<string>{
        // const headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json; charset=utf-8')
        //     .set( 'No-Auth', 'True' );
        const id = this.userAuth.getUserId()
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/admin/insertRestaurant/` + id, form)
        )
    }

    public getRestaurants(id: string): Promise<Restaurant[]>{
        const params = new HttpParams()
            .set('userId', id);
        const headers = new HttpHeaders()
            .set('authorization', `Bearer ${this.userAuth.getToken()}`)
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.get<Restaurant[]>(`${this.RAILWAY_URL}/admin`, { params: params, headers: headers })
        )
    }

    public getRestaurantDetails(id: number): Promise<RestaurantDetails>{
        return firstValueFrom(
            this.http.get<RestaurantDetails>(`${this.RAILWAY_URL}/admin/updateRestaurant/` + id)
        )
    }

    public updateRestaurant(form: Restaurant, restaurantId: number): Promise<string>{
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
            .set("userId", `${this.userAuth.getUserId()}`);
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/admin/updateRestaurant`, form, { params: params})
        )
    }

    public deleteRestaurant(restaurantId: number): Promise<string>{
        const headers = new HttpHeaders()
        .set('authorization', `Bearer ${this.userAuth.getToken()}`)
        .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.delete<string>(`${this.RAILWAY_URL}admin/delete/` + restaurantId, { headers: headers})
        )
    }

    public getCuisine(): Promise<cuisine[]>{
        return firstValueFrom(
            this.http.get<cuisine[]>(`${this.RAILWAY_URL}/admin/cuisine`)
        )
    }

    public getCuisinebyId(id: number): Promise<string>{
        const params = new HttpParams().set("cuisineId", id)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('authorization', `Bearer ${this.userAuth.getToken()}`)
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.get<string>(`${this.RAILWAY_URL}/admin/cuisineType`, { params: params, headers: headers })
        )
    }

    public getCuisineString(id: number): Promise<cuisineType>{
        const params = new HttpParams().set("cuisineId", id)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('authorization', `Bearer ${this.userAuth.getToken()}`)
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.get<cuisineType>(`${this.RAILWAY_URL}/admin/cuisineString`, { params: params, headers: headers })
        )
    }

    public postImages(id: number, file: File): Promise<string>{
        const fileName = file.name
        const formData = new FormData()
        formData.append("imgFile", file, fileName)
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/admin/insertImages/` + id, formData)
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

    public getAllMeals(): Promise<mealNames[]>{
        return firstValueFrom(
            this.http.get<mealNames[]>(`${this.RAILWAY_URL}/meal/allNames`)
        )
    }

    public getAllCategories(): Promise<mealNames[]>{
        return firstValueFrom(
            this.http.get<mealNames[]>(`${this.RAILWAY_URL}/meal/allCategories`)
        )
    }

    public postListofDishes(meals: meals[]): Promise<string>{
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}meal/insertMeals`, meals)
        )
    }

    public getMeals(): Observable<mealNames[]>{
        return this.http.get<mealNames[]>(`${this.RAILWAY_URL}/meal/allNames`)
    }

    public postCapacity(capacity: capacity[]): Promise<string>{
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/capacity/insertCapacity`, capacity)
        )
    }
}