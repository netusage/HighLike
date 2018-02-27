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
  private errormsg: string = '';

  constructor() {
   }

  ngOnInit() {
    if(!localStorage.key(0))
    {
        this.personQuery = new PersonQuery(
            {
              city: "", 
              experience_years_from: 0, 
              experience_years_to: 100, 
              education: "", 
              company: ""
            }
        );
      }
      else{
        this.personQuery = new PersonQuery(
          {
            city: localStorage.getItem("city"), 
            experience_years_from: Number(localStorage.getItem("experience_years_from")), 
            experience_years_to: Number(localStorage.getItem("experience_years_to")), 
            education: localStorage.getItem("education"), 
            company: localStorage.getItem("company")
          }
      );
      }

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
        // this.errormsg = "יש להזין לפחות אחד המאפיינים";
      }
      else {
        localStorage.setItem("city", this.personQuery.city);
        localStorage.setItem("company", this.personQuery.company);
        localStorage.setItem("education", this.personQuery.education);
        if (localStorage.getItem("experience_years_from")){
          localStorage.setItem("experience_years_from", this.personQuery.experience_years_from.toString());
        }
        if (localStorage.getItem("experience_years_to")){
          localStorage.setItem("experience_years_to", this.personQuery.experience_years_to.toString());
        }
        this.personQueryEmiter.emit(this.personQuery);
      }
  }
}
