import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../models/person-model';
import { LoadDataService } from '../services/load-data.service';
import { PersonQuery } from '../models/person-query-model';

@Component({
  selector: 'app-filter-candidates',
  templateUrl: './filter-candidates.component.html',
  styleUrls: ['./filter-candidates.component.css']
})
export class FilterCandidatesComponent implements OnInit {

  personQuery: PersonQuery;
  constructor(public loadDataService: LoadDataService) { 
  }

  ngOnInit() {
  }

  onQueryChange(changedQuery: PersonQuery): void
  {
    this.personQuery = changedQuery;
  }

}
