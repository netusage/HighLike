import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoadDataService } from '../../services/load-data.service';
import { PersonModel } from '../../models/person-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()  cityEmiter: EventEmitter<string> = new EventEmitter<string>();
  
  public city: string;

  constructor(private loadDataService: LoadDataService) { }

  ngOnInit() {
  }

  FindPersonsForCity() {
    debugger;
    this.cityEmiter.emit(this.city);

    let  personObject: PersonModel ; 
    //{      city: "",      first_name: "",    };
    personObject.city = this.city;
    
    this.loadDataService.postJSON(personObject);
  }

  
}
