import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup
  user!: User

  constructor(private userAuthSvc: UserAuthService, private userService: UserService, private fb: FormBuilder){ }

  ngOnInit(): void {
      this.form = this.createForm()
      this.userService.getUserInfo(this.userAuthSvc.getUserId())
        .then(result => {
          this.user = result
        })
  }

  createForm(): FormGroup{
    return this.fb.group({
      email: this.fb.control<string>('', [ Validators.email ]),
      phone: this.fb.control<string>('')
    })
  }

}
