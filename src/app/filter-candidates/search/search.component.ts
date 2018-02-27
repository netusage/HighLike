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
    //console.log(this.personQuery);
    //console.log("valid: " + valid);
    if (
      this.personQuery.city == "" &&
      //this.personQuery.experience_years_from == 0 &&
      //this.personQuery.experience_years_to == 100 &&
      this.personQuery.education == "" &&
      this.personQuery.company == ""){
        alert("יש להזין לפחות אחד המאפיינים");
      }
      else {
        this.personQueryEmiter.emit(this.personQuery);
      }
  }
}
