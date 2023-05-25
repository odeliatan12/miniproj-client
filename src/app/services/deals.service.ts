import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allDeals, categories, deals, vouchers } from "../models/model";
import { firstValueFrom } from "rxjs";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class DealService{

    constructor(private http: HttpClient, private userAuth: UserAuthService){ }

    public getAllCategories(): Promise<categories[]>{
        return firstValueFrom(
            this.http.get<categories[]>("/deals/getCategories")
        )
    }

    public insertNewDeal(deals: deals, restaurantId: number): Promise<string>{
        return firstValueFrom(
            this.http.post<string>("/deals/newDeals/" + restaurantId, deals)
        )
    }

    public getAllDeals(): Promise<allDeals[]>{
        return firstValueFrom(
            this.http.get<allDeals[]>("/deals/getAllDeals")
        )
    }

    public getDeal(idx: string): Promise<allDeals[]>{
        const params = new HttpParams().set("id", idx)
        return firstValueFrom(
            this.http.get<allDeals[]>("/deals/getDeal", { params: params })
        )
    }

    public getDealbyCategory(category: string): Promise<allDeals[]>{
        const params = new HttpParams()
            .set("category", category)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set( 'No-Auth', 'True' );
        return firstValueFrom(
            this.http.get<allDeals[]>("/getDealbyCategory", { params: params, headers: headers})
        )
    }

    public getVouchersbyId(): Promise<vouchers[]>{
        const userId = this.userAuth.getUserId()
        const params = new HttpParams()
            .set("id", `${userId}`)
        return firstValueFrom(
            this.http.get<vouchers[]>("/deals/getDealbyId", { params })
        )   
    }

    public getDealInfobyId(idx: string): Promise<allDeals>{
        const params = new HttpParams()
            .set("id", idx)
        return firstValueFrom(
            this.http.get<allDeals>("/deals/getDealbydealId", { params })
        )
    }

}