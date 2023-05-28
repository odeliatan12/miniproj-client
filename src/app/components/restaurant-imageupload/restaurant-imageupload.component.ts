import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-restaurant-imageupload',
  templateUrl: './restaurant-imageupload.component.html',
  styleUrls: ['./restaurant-imageupload.component.css']
})
export class RestaurantImageuploadComponent implements OnInit {

  form!: FormGroup
  selectedFile!: File;

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private activatedRoute: ActivatedRoute, private route: Router, private userAuth: UserAuthService, private utilService: UtilsService ){ }

  ngOnInit(): void {

    this.form = this.fb.group({
      picture: this.fb.control<Blob | null>(null)
    })
      
  }

  onFileSelected(event: any) {
    // collect selected file
    this.selectedFile = event.target.files[0] as File
  }

  saveImage(){
    const value = this.selectedFile
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    this.adminSvc.postImages(restaurantId, value)
      .then(
        (response) => { 
          console.debug(response) 
          this.utilService.basicSweetAlert("Image is uploaded", 3000, "success", this.route.navigate(["/admin/restaurantList"]))
        }
      )
      .catch(
        (error) => { 
          console.warn(error)
        }
      );
  }

}
