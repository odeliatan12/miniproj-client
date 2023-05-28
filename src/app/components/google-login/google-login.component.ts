import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor( private fb: FormBuilder ,private socialAuthService: SocialAuthService, private userService: UserService, private userAuthService: UserAuthService, private route: Router, private ngZone: NgZone){ }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    google.accounts.id.initialize({
      client_id: '833064911004-809r50phgjvm0p084vsbhk60un9dbc5j.apps.googleusercontent.com',
      context: "signin",
      // can only have either ballback or login_uri NOT BOTH
      callback: this.googleRegister.bind(this),
      auto_select: false, // autoselects first google account of user to login
      cancel_on_tap_outside: true, // cancel if user clicks outside of popup
      // log_level: "debug"
    })
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("googleBtn"),
      { theme: "outline", text: "signup_with", shape: "pill", style: "width: 100%" }
    )
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { })

  }

  public googleRegister(response: CredentialResponse){

    this.userService.googleRegister(response.credential)
      .then(response => {

        // set username
        this.userAuthService.setUserId(response.id)

        // set roles
        this.userAuthService.setRoles(response.role)

        // obtain the token and set it into localstorage
        this.userAuthService.setToken(response.token)

        const role = response.role;
        
        if(role === "ADMIN" && this.userAuthService.getToken() != null){
          this.route.navigate(["/admin/restaurantList"])
        } else {
          this.ngZone.run(() => {
            this.route.navigate(["/user/home"]) // send user to whatever page after logged in
          })
        }
      }).catch(result => {
        this.ngZone.run(() => {
          this.route.navigate(["/user/home"]) // send user to whatever page after logged in
        })
        // this.route.navigate(["/login"])
      })
  }
}
