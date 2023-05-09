import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUser, User } from 'src/app/models/model';
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

  constructor(private userAuthSvc: UserAuthService, private userService: UserService, private fb: FormBuilder, private route: Router){ }

  ngOnInit(): void {
    this.form = this.createForm()
    this.userService.getUserInfo(this.userAuthSvc.getUserId())
      .then(result => {
        this.user = result
        this.form.patchValue({
          username: this.user.userName,
          email: this.user.email,
          phone: this.user.contact,
        })
      })
  }

  createForm(): FormGroup{
    return this.fb.group({
      username: this.fb.control<string>(''),
      email: this.fb.control<string>('', [ Validators.email ]),
      phone: this.fb.control<string>('')
    })
  }

  updateChanges(){
    const value = this.form.value as UpdateUser
    const id = this.userAuthSvc.getUserId()
    this.userService.updateUser(value, id);
    this.route.navigate(['user/profile'])
  }

  
}
