// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter',
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], searchTerm: string): any[] {
//     if (!items) {
//       return [];
//     }
//     if (!searchTerm) {
//       return items;
//     }
//     searchTerm = searchTerm.toLowerCase();
//     return items.filter((it) => {
//       return it.firstName.toLowerCase().includes(searchTerm);
//     });
//   }
// }

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter',
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], searchTerm: any, filterOption: string): any[] {
//     if (!items) {
//       return [];
//     }
//     if (!searchTerm || searchTerm === '') {
//       return items;
//     }
//     if (!filterOption || filterOption === '') {
//       return items.filter((item) =>
//         JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     return items.filter((item) =>
//       item[filterOption].toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }
// }

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter',
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], searchTerm: string, filterOption: string): any[] {
//     if (!items) return [];
//     if (!searchTerm) return items;

//     searchTerm = searchTerm.toLowerCase();

//     return items.filter((it) => {
//       let term = '';
//       if (filterOption === 'name') {
//         term = (it.firstName + ' ' + it.lastName).toLowerCase();
//       } else if (filterOption === 'email') {
//         term = it.email.toLowerCase();
//       }

//       return term.includes(searchTerm);
//     });
//   }
// }

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
