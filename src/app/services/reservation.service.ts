import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { reservation, timing } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class ReservationService{

    constructor(private http: HttpClient, private userAuthService: UserAuthService){ }

    public getTimings(id: number): Promise<timing[]>{
        return firstValueFrom(
            this.http.get<timing[]>("/reservations/" + id)
        )
    }

    public insertReservation(restaurantId: number, reservation: reservation): Promise<string>{
        const userId = this.userAuthService.getUserId()
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
            .set("userId", `${userId}`);
        return firstValueFrom(
            this.http.post<string>("/postReservation", reservation, { params: params })
        )
    }

}