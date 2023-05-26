import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class UserAuthService{

    constructor(private route: Router){ }

    public setRoles(roles: string) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    public getRoles(): string | null {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : null;
    }

    public setUserName(userName: string){
        localStorage.setItem('userName', userName)
    }

    public getUserName(): string | null{
        return localStorage.getItem('userName')
    }

    public setUserId(userId: number){
        localStorage.setItem('userId', JSON.stringify(userId));
    }

    public getUserId(): string | null{
        return localStorage.getItem('userId');
    }

    public setToken(jwtToken: string) {
        localStorage.setItem('jwtToken', jwtToken);
    }

    public getToken(): string | null{
        return localStorage.getItem('jwtToken');
    }

    public clear() {
        localStorage.clear();
    }

    public isLoggedIn() {
        return this.getRoles() && this.getToken();
    }

    public getAuthentication(){
        const role = this.getRoles()
        if(role === "ADMIN" && this.getToken() != null){
            this.route.navigate(["/admin/restaurantList"])
        } else if( role === "USER" && this.getToken() != null ) {
            this.route.navigate(["/user/home"])
        } else {
            this.route.navigate(["/login"])
        }   
    }
}