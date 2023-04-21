import { Injectable } from "@angular/core";

@Injectable()
export class UserAuthService{

    constructor(){ }

    public setRoles(roles: string) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    public getRoles(): [] | null {
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

}