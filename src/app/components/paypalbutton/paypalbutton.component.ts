import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { order, voucher } from 'src/app/models/model';
import { payPalService } from 'src/app/services/paypal.service';
import { render } from 'creditcardpayments/creditCardPayments';
import Swal from 'sweetalert2';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-paypalbutton',
  templateUrl: './paypalbutton.component.html',
  styleUrls: ['./paypalbutton.component.css']
})
export class PaypalbuttonComponent implements AfterContentInit {

  constructor(private payPalSvc: payPalService, private fb: FormBuilder, public activatedRoute: ActivatedRoute, private route: Router, private userAuth: UserAuthService, private utilService: UtilsService){ 
    
  }

  ngAfterContentInit(): void {
    render(
      {
          id: "#payments",
          currency: "SGD",
          value: this.activatedRoute.snapshot.params["amount"],
          onApprove: (details) => {
            const amount = this.activatedRoute.snapshot.params["amount"]
            const dealId = this.activatedRoute.snapshot.params["dealId"]
            const restaurantId = this.activatedRoute.snapshot.params["restaurantId"]
            const vouchers = new voucher(dealId, amount)
            this.payPalSvc.insertVoucher(vouchers, restaurantId)
            this.utilService.basicSweetAlert("Payment success", 3000, "success", this.route.navigate(['user/home/']))
          }
        }
      );
  }

}
