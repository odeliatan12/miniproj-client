import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Restaurant, RestaurantDetails } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class AdminService{

    constructor(private http: HttpClient, private userAuth: UserAuthService){ }

    public saveRestaurant(formData: FormData): Promise<string>{
        // const headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json; charset=utf-8')
        //     .set( 'No-Auth', 'True' );
        const id = this.userAuth.getUserId()
        const headers = new HttpHeaders()
        .set('authorization', `Bearer ${this.userAuth.getToken()}`)
        .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.post<string>("/admin/insertRestaurant/" + id, formData)
        )
    }

    public getRestaurants(id: string): Promise<Restaurant[]>{
        const params = new HttpParams().set('userId', id);
        return firstValueFrom(
            this.http.get<Restaurant[]>("/admin", { params: params })
        )
    }

    public getRestaurantDetails(id: number): Promise<RestaurantDetails>{
        return firstValueFrom(
            this.http.get<RestaurantDetails>("/admin/updateRestaurant/" + id)
        )
    }
}