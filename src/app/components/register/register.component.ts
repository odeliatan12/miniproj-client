import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { Login } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup
  fieldTextType!: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router, private userAuthService: UserAuthService, private utilsService: UtilsService){ }

  ngOnInit(): void {

    this.form = this.createForm()
    const role = this.userAuthService.getRoles()
    if(role === "ADMIN" && this.userAuthService.getToken() != null){
      this.route.navigate(["/admin/restaurantList"])
    } else if( role === "USER" && this.userAuthService.getToken() != null ) {
      this.route.navigate(["/user/home"])
    } else {
      this.route.navigate(["/register"])
    }
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required, Validators.min(5) ]),
      password: this.fb.control<string>('', [ Validators.required, this.utilsService.patternValidator() ]),
      email: this.fb.control<string>('', [ Validators.email ]),
      contact: this.fb.control<string>(''),
      roleId: this.fb.control('')
    })
  }

  registerUser(){
    const value = this.form.value as Login
    this.userService.register(value)
    .catch(result => {
      if(result.status === 400){
        this.utilsService.sweetAlert("Username is taken", 1000, "error")
      } else if(result.status === 200){
        this.userService.login(value)
          .then((response: any) => {
            // set username
            this.userAuthService.setUserId(response.id)

            // to get roles of the person logging in
            this.userAuthService.setRoles(response.role);

            // obtain the token and set it into localstorage
            this.userAuthService.setToken(response.token);

            const role = result.role;
            if(role === "ADMIN" && this.userAuthService.getToken() != null){
              this.utilsService.sweetAlert("Thank you for registering", 1000, "success")
              this.route.navigate(["/admin/restaurantList"])
            } else {
              this.utilsService.sweetAlert("Thank you for registering", 1000, "success")
              this.route.navigate(["/user/home"])
            }
          }
        )
      }
    })
    
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
