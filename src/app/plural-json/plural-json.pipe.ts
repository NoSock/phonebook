import { Pipe, PipeTransform } from '@angular/core';

interface pipePrams {
  param?: string;
  pluralParam?: string;
}

@Pipe({
  name: 'pluralJson'
})
export class PluralJsonPipe implements PipeTransform {

  transform(value: string, args?: pipePrams): string {
    if (!value) {
      return value;
    }
    const params = JSON.parse(value);
    const pluralParam = args.pluralParam;
    const param = args.param;
    const variant = params[pluralParam] || params.other || value;
    return variant.replace(/\{val\}/g, param);
  }

}
