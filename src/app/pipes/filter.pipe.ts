import { Pipe, PipeTransform } from '@angular/core';
import { PersonModel } from '../models/person-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: PersonModel[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.city.toLowerCase().includes(searchText);
    });
   }
}