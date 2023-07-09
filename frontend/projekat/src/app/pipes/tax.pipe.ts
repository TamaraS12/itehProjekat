import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tax'
})
export class TaxPipe implements PipeTransform {

  transform(value: number): string {
    return value + '$ + Taksa: ' + (0.2 * value).toFixed(2) + '$';
  }

}
