import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaToArray'
})
export class CommaToArrayPipe implements PipeTransform {
  transform(value: string) {
    if (!value.includes(',')) {
      return [value];
    }

    return value.split(',').map(val => val.trim());
  }
}