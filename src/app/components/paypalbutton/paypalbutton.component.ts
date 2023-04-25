import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { order } from 'src/app/models/model';
import { payPalService } from 'src/app/services/paypal.service';

@Component({
  selector: 'app-paypalbutton',
  templateUrl: './paypalbutton.component.html',
  styleUrls: ['./paypalbutton.component.css']
})
export class PaypalbuttonComponent implements OnInit {

  form!: FormGroup

  constructor(private payPalSvc: payPalService, private fb: FormBuilder, public activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
      // this.form = this.createForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      price: this.fb.control<number>(1),
      currency: this.fb.control<string>(''),
      method: this.fb.control<string>(''),
      intent: this.fb.control<string>(''),
      description: this.fb.control<string>(''),
    })
  }

  payNow(){
    const value = this.form.value as order
    this.payPalSvc.payNow(value)
  }


}
