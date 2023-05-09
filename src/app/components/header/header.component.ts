import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results!: any;
  searchTerm$ = new Subject<string>();

  constructor( private userAuthService: UserAuthService,
    private router: Router, public userService: UserService, 
    private searchService: SearchService){
    this.searchTerm$.subscribe(inputData => {
      console.log('=> searchTerm$ inputData: ', inputData);
    });
    this.searchService.search(this.searchTerm$)
      .subscribe((data: { results: object; }) => {
        console.log(data)
        this.results = data.results;
        console.log('=> results: ', this.results);
  });
  }
  
  ngOnInit(): void {
      
  }
  
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
