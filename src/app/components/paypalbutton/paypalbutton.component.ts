import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { order, voucher } from 'src/app/models/model';
import { payPalService } from 'src/app/services/paypal.service';
import { render } from 'creditcardpayments/creditCardPayments';
import Swal from 'sweetalert2';

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
            console.log(details)
            const amount = this.activatedRoute.snapshot.params["amount"]
            console.log(amount)
            const dealId = this.activatedRoute.snapshot.params["dealId"]
            console.log(dealId)
            const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
            const vouchers = new voucher(dealId, amount)
            this.payPalSvc.insertVoucher(vouchers, restaurantId)
            Swal.fire({
              title: 'Payment success',
              icon: 'success',
              timer: 3000
            })
            this.route.navigate(['user/home/'])
          }
        }
      );
  }

}
