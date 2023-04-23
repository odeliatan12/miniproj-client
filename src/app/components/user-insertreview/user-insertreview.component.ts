import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-insertreview',
  templateUrl: './user-insertreview.component.html',
  styleUrls: ['./user-insertreview.component.css']
})
export class UserInsertreviewComponent implements OnInit {

  @ViewChild('file')
  image: ElementRef | undefined;
  
  form!: FormGroup

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private userSvc: UserService, private route: Router){ }

  ngOnInit(): void {
      this.form = this.createForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      ratings: this.fb.control<number>(1, [ Validators.min(1), Validators.max(5) ]),
      description: this.fb.control<string>('', [ Validators.minLength(10), Validators.maxLength(100) ]),
      image: this.fb.control('')
    })
  }

  submitReview(){
    const value = this.form.value; 
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    const formData = new FormData();
    formData.set('description', value.description)
    formData.set('ratings', value.ratings)
    formData.set('image', this.image?.nativeElement.files[0])
    this.userSvc.postReview(formData, restaurantId)
    .then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
      this.route.navigate(['user/userReview/', restaurantId])
    })
  }

}
