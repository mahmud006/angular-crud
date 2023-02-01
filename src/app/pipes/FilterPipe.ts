import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterOption: string, term: string): any[] {
    if (!items) return [];
    if (!term) return items;
    term = term.toLowerCase();
    return items.filter((item) => {
      if (filterOption === 'name') {
        return item.firstName.toLowerCase().includes(term);
      } else if (filterOption === 'email') {
        return item.email.toLowerCase().includes(term);
      }
    });
  }
}
