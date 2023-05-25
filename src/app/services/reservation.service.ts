import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { GoogleCalendar, reservation, reservationDetails, timing } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class ReservationService{

    RAILWAY_URL: string = "https://food-review-production.up.railway.app/"

    constructor(private http: HttpClient, private userAuthService: UserAuthService){ }

    public getTimings(id: number): Promise<timing[]>{
        return firstValueFrom(
            this.http.get<timing[]>(`${this.RAILWAY_URL}/reservations/` + id)
        )
    }

    public getAvailableTimings(date: string, restaurantId: number): Promise<timing[]>{
        const params = new HttpParams()
            .set("date", date)
        return firstValueFrom(
            this.http.get<timing[]>(`${this.RAILWAY_URL}/getAvailabletimings/` + restaurantId, { params: params })
        )
    }

    public insertReservation(restaurantId: number, reservation: reservation): Promise<string>{
        const userId = this.userAuthService.getUserId()
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
            .set("userId", `${userId}`);
        return firstValueFrom(
            this.http.post<string>(`${this.RAILWAY_URL}/postReservation`, reservation, { params: params })
        )
    }

    public getReservationbyId(): Promise<reservationDetails[]>{
        const userId = this.userAuthService.getUserId()
        return firstValueFrom(
            this.http.get<reservationDetails[]>(`${this.RAILWAY_URL}/getReservation/` + userId)
        )
    }

    public getReservation(idx: number): Promise<reservationDetails>{
        return firstValueFrom(
            this.http.get<reservationDetails>(`${this.RAILWAY_URL}/getReservationbyId/` + idx)
        )
    }

    public googleEvent(event: GoogleCalendar): Promise<any>{
        const userId = this.userAuthService.getUserId()
        const params = new HttpParams()
            .set("userId", `${userId}`);
        return firstValueFrom(
            this.http.post<any>(`${this.RAILWAY_URL}/createGoogleEvent`, event, { params: params })
        )
    }

    public deleteEvent(idx: number): Promise<string>{
        return firstValueFrom(
            this.http.delete<string>("/deleteReservation/" + idx)
        )
    }

}