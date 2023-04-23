import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.css']
})
export class DealDetailsComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder){ }

  ngOnInit(): void {
      
  }

  createForm(): FormGroup{
    return this.fb.group({
      
    })
  }

}
