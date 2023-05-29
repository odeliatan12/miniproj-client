import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postReviews } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-insertreview',
  templateUrl: './user-insertreview.component.html',
  styleUrls: ['./user-insertreview.component.css']
})
export class UserInsertreviewComponent implements OnInit {

  @ViewChild('file')
  image: ElementRef | undefined;

  selectedImage!: File;
  
  form!: FormGroup

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private userSvc: UserService, private route: Router, private utilService: UtilsService){ }

  ngOnInit(): void {
      this.form = this.createForm()
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
  }

  createForm(): FormGroup{
    return this.fb.group({
      ratings: this.fb.control<number>(1, [ Validators.min(1), Validators.max(5) ]),
      description: this.fb.control<string>('', [ Validators.minLength(10), Validators.maxLength(200) ]),
      image: this.fb.control('')
    })
  }

  submitReview(){
    const value = this.form.value as postReviews; 
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    this.userSvc.postReview(value, restaurantId)
    .then(result => {
    }).catch(result => {
      this.utilService.basicSweetAlert("Review is now added", 3000, "success", this.route.navigate(['user/userReview/', restaurantId]))
    })
  }

}
