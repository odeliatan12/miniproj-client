import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Login, Restaurant, RestaurantDetails } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class UserService{

    constructor(private http: HttpClient, private userAuthService: UserAuthService){ }

    public register(registerData: Login): Promise<string>{
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.post<string>("/api/auth/register", JSON.stringify(registerData), { headers: headers })
        )
    }

    // obtain both the jwttoken and the role
    public login(loginData: Login): Promise<string> {
        // const headers = new HttpHeaders({ 'Authorization': 'True' });
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.post<string>("/api/auth/login", JSON.stringify(loginData), {headers: headers})
        )
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
            this.http.get<RestaurantDetails[]>("/allRestaurants")
        )
    }
}