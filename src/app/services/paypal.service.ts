import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { order, voucher } from "../models/model";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class payPalService{

    constructor(private http: HttpClient, private userAuth: UserAuthService){ }

    public payNow(order: order): Promise<string>{
        return firstValueFrom(
            this.http.post<string>("/paypal/pay", order)
        )
    }

    public insertVoucher(voucher: voucher, restaurantId: number): Promise<string>{
        const params = new HttpParams()
            .set("restaurantId", restaurantId)
            .set("userId", `${this.userAuth.getUserId()}`);

        const headers = new HttpHeaders()
            .set('authorization', `Bearer ${this.userAuth.getToken()}`)
            .set( 'No-Auth', 'True' );

        return firstValueFrom(
            this.http.post<string>("/deals/vouchers", voucher,{ params: params, headers: headers })
        )
    }
}