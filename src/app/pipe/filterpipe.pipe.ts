import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input && input.trim() !== '') {
      return value.filter((val: string) => val.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    } else {
      return value;
    }
   }

}
