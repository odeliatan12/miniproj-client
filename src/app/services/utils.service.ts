import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class UtilsService{

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

    
}

// this.utilService.basicSweetAlert("Restaurant details is now updated", 3000, "success", this.route.navigate(["/admin/restaurantList"]))