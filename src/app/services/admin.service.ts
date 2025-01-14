import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, firstValueFrom } from "rxjs";
import { Restaurant, RestaurantDetails, RestaurantPost, capacity, cuisine, image, mealNames, meals } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class AdminService{

    constructor(private http: HttpClient, private userAuth: UserAuthService){ }

    public saveRestaurant(form: RestaurantPost): Promise<string>{
        // const headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json; charset=utf-8')
        //     .set( 'No-Auth', 'True' );
        const id = this.userAuth.getUserId()
        return firstValueFrom(
            this.http.post<string>("/admin/insertRestaurant/" + id, form)
        )
    }

    public getRestaurants(id: string): Promise<Restaurant[]>{
        const params = new HttpParams()
            .set('userId', id);
        return firstValueFrom(
            this.http.get<Restaurant[]>("/admin", { params: params })
        )
    }

    public getRestaurantDetails(id: number): Promise<RestaurantDetails>{
        return firstValueFrom(
            this.http.get<RestaurantDetails>("/admin/updateRestaurant/" + id)
        )
    }

    public updateRestaurant(form: Restaurant, restaurantId: number): Promise<string>{
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
            .set("userId", `${this.userAuth.getUserId()}`);
        return firstValueFrom(
            this.http.post<string>("/admin/updateRestaurant", form, { params: params})
        )
    }

    public deleteRestaurant(restaurantId: number): Promise<string>{
        const headers = new HttpHeaders()
        .set('authorization', `Bearer ${this.userAuth.getToken()}`)
        .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.delete<string>("admin/delete/" + restaurantId, { headers: headers})
        )
    }

    public getCuisine(): Promise<cuisine[]>{
        return firstValueFrom(
            this.http.get<cuisine[]>("admin/cuisine")
        )
    }

    public getCuisinebyId(id: number): Promise<string>{
        const params = new HttpParams().set("cuisineId", id)
        return firstValueFrom(
            this.http.get<string>("/admin/cuisineType", { params: params })
        )
    }

    public postImages(id: number, file: File): Promise<string>{
        const fileName = file.name
        const formData = new FormData()
        formData.append("imgFile", file, fileName)
        return firstValueFrom(
            this.http.post<string>("/admin/insertImages/" + id, formData)
        )
    }

    public getImage(id: number): Promise<any>{
        return firstValueFrom(
            this.http.get<image>("/image/" + id)
        ).then(result => {
            console.log(result.picture)
            const image = new Image()
            image.src = 'data:' + result.image_fileType + ';base64,' + result.picture
            return image.src 
        })
    }

    public getAllMeals(): Promise<mealNames[]>{
        return firstValueFrom(
            this.http.get<mealNames[]>("/meal/allNames")
        )
    }

    public getAllCategories(): Promise<mealNames[]>{
        return firstValueFrom(
            this.http.get<mealNames[]>("/meal/allCategories")
        )
    }

    public postListofDishes(meals: meals[]): Promise<string>{
        return firstValueFrom(
            this.http.post<string>("meal/insertMeals", meals)
        )
    }

    public getMeals(): Observable<mealNames[]>{
        return this.http.get<mealNames[]>("/meal/allNames")
    }

    public postCapacity(capacity: capacity[]): Promise<string>{
        return firstValueFrom(
            this.http.post<string>("/capacity/insertCapacity", capacity)
        )
    }
}