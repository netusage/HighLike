import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonModel } from '../../models/person-model';
import { PersonQuery } from '../../models/person-query-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()  personQueryEmiter: EventEmitter<PersonQuery> = new EventEmitter<PersonQuery>();
  
  public city: string;
  private personQuery: PersonQuery;

  constructor() { }

  ngOnInit() {
      this.personQuery = new PersonQuery(
         {
          city: "", experience_years_from: 0, experience_years_to: 100, education: "", company: ""
         }
    );
  }

  FindPersons({ value, valid}: { value: PersonQuery, valid: boolean }) {
    this.personQuery = value;
    if(!this.personQuery.city && !this.personQuery.company && !this.personQuery.education){
      alert("יש להזין לפחות שדה חיפוש אחד");
      return;
    }

    this.personQueryEmiter.emit(this.personQuery);
  }
}
