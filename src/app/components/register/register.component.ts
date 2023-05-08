import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router){ }

  ngOnInit(): void {

    this.form = this.createForm()
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required, Validators.min(5) ]),
      password: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.email ]),
      contact: this.fb.control<string>(''),
      roleId: this.fb.control('')
    })
  }

  registerUser(){
    const value = this.form.value as Login
    console.log(value.username)
    console.log(value.roleId)
    this.userService.register(value)
    this.route.navigate(["/register"])
  }

}
