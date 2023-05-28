import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userAuthService: UserAuthService, private route: Router){ }

    // not working headers not working yet
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.headers.get('No-Auth') === 'True'){
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken();
        if (token !== null) {
            req = this.addToken(req, token);
        }

        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse) => {
                    if(err.status === 401) {
                        this.route.navigate(['/home']);
                    } else if(err.status === 403) {
                        this.route.navigate(['/home']);
                    }
                    throw new Error("Some thing is wrong");
                }
            )
        );
        
    }

    private addToken(request:HttpRequest<any>, token:string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization : `Bearer ${token}`
                }
            }
        );
    }

}