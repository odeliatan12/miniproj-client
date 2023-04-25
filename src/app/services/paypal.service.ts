import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { order } from "../models/model";

@Injectable()
export class payPalService{

    constructor(private http: HttpClient){ }

    public payNow(order: order): Promise<string>{
        return firstValueFrom(
            this.http.post<string>("/paypal/pay", order)
        )
    }
}