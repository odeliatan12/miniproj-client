import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allDeals, categories, deals } from "../models/model";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DealService{

    constructor(private http: HttpClient){ }

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

}