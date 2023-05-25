import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from "rxjs";

@Injectable()
export class SearchService{

    RAILWAY_URL: string = "https://food-review-production.up.railway.app"

    constructor(private http: HttpClient){ }

    search(terms: Observable<string>): any{
        return terms.pipe(
            // debounceTime(400): waits until there’s no new data for the provided amount of time
            debounceTime(400),
            // distinctUntilChanged():
            //      will ensure that only distinct data passes through
            //      will only send the data once
            distinctUntilChanged(),
            // switchMap():
            //      combines multiple possible observables received from the searchEntries method into one,
            //      which ensures that we use the results from the latest request only.
            switchMap((term: string) => this.searchEntries(term))
        )
    }


    searchEntries(term: string): Observable<object[]>{

        console.log(term)
        if (term === '') {
            return of([]);
        };
        return this.http.get<object[]>(`${this.RAILWAY_URL}/restaurantName/` + term);
    }

}