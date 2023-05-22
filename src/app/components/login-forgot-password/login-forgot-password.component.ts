import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login-forgot-password',
  templateUrl: './login-forgot-password.component.html',
  styleUrls: ['./login-forgot-password.component.css']
})
export class LoginForgotPasswordComponent implements OnInit {

  email: string = ''

  constructor(private authService: UserAuthService){ }

  ngOnInit(): void {
      
  }

}
