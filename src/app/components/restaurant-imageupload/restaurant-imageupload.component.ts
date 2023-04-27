import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-restaurant-imageupload',
  templateUrl: './restaurant-imageupload.component.html',
  styleUrls: ['./restaurant-imageupload.component.css']
})
export class RestaurantImageuploadComponent implements OnInit {

  form!: FormGroup
  selectedFile!: File;

  constructor(private fb: FormBuilder, private adminSvc: AdminService, private activatedRoute: ActivatedRoute ){ }

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
    const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
    
    
  }

}
