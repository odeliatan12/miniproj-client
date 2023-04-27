import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { order } from 'src/app/models/model';
import { payPalService } from 'src/app/services/paypal.service';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-paypalbutton',
  templateUrl: './paypalbutton.component.html',
  styleUrls: ['./paypalbutton.component.css']
})
export class PaypalbuttonComponent implements AfterContentInit {

  constructor(private payPalSvc: payPalService, private fb: FormBuilder, public activatedRoute: ActivatedRoute, private route: Router){ 
    
  }

  ngAfterContentInit(): void {
    render(
      {
          id: "#payments",
          currency: "SGD",
          value: this.activatedRoute.snapshot.params["amount"],
          onApprove: (details) => {
            alert("payment success")
          }
        }
      );
  }

}
