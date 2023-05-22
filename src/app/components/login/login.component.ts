import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, token } from 'src/app/models/model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  token!: token
  error!: string
  show: boolean = false
  fieldTextType!: boolean;

  constructor( private fb: FormBuilder, private userSvc: UserService, private userAuthService: UserAuthService, private route: Router){} 

  ngOnInit(): void {

    this.form = this.createLoginForm()
      
  }

  createLoginForm(): FormGroup{
    return this.fb.group({
      username: this.fb.control<string>(''),
      password: this.fb.control<string>('')
    })
  }

  submitLoginForm(){
    const value = this.form.value as Login
    this.userSvc.login(value)
      .then((response: any) => {

        console.log(response.role)

        // set username
        this.userAuthService.setUserId(response.id)

        // to get roles of the person logging in
        this.userAuthService.setRoles(response.role);

        // obtain the token and set it into localstorage
        this.userAuthService.setToken(response.token);

        const role = response.role;
        if(role === "ADMIN" && this.userAuthService.getToken() != null){
          this.route.navigate(["/admin/restaurantList"])
        } else {
          this.route.navigate(["/user/home"])
        }
      }).catch((error: any) => {
        console.log(error);
        this.show = true
        this.error = "Incorrect name or password"
        // this.route.navigate(["/login"])
      })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
