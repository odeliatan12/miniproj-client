import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import Swal from "sweetalert2";

@Injectable()
export class UtilsService{

    sweetAlert(message: string, timing: number, icon: any){ 
      Swal.fire({
        title: message,
        icon: icon,
        timer: timing
      })
    }

    basicSweetAlert(message: string, timing: number, icon: any, reload: any){
        Swal.fire({
            title: message,
            icon: icon,
            timer: timing
          }
            
          )
          setTimeout(() => {
            reload
          }, timing); 
    }

    patternValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
          return null;
        }
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
        const valid = regex.test(control.value);
        return valid ? null : { invalidPassword: true };
      };
    }

    
}

// this.utilService.basicSweetAlert("Restaurant details is now updated", 3000, "success", this.route.navigate(["/admin/restaurantList"]))