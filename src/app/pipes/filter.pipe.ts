import { Pipe, PipeTransform } from '@angular/core';
import { PersonModel } from '../models/person-model';
import { PersonQuery } from '../models/person-query-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: PersonModel[], searchCriteria: PersonQuery): any[] {
    if (!items) return [];
    if (!searchCriteria) return items;
    
    // searchCriteria.city = searchCriteria.city.toLowerCase();
    // searchCriteria.company = searchCriteria.company.toLowerCase();
    // searchCriteria.education = searchCriteria.education.toLowerCase();
    debugger;
    return items.filter(it => {
      return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
             (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
             (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
             (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from ) &&
             (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to )   ;
    });
  }
}