import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mealsearch',
  templateUrl: './user-mealsearch.component.html',
  styleUrls: ['./user-mealsearch.component.css']
})
export class UserMealsearchComponent {

  constructor(private userService: UserService){ }

  

}
