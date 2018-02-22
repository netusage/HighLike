import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../models/person-model';
import { LoadDataService } from '../services/load-data.service';

@Component({
  selector: 'app-filter-candidates',
  templateUrl: './filter-candidates.component.html',
  styleUrls: ['./filter-candidates.component.css']
})
export class FilterCandidatesComponent implements OnInit {

  city: string;
  constructor(public loadDataService: LoadDataService) { 
  }

  ngOnInit() {
  }

  onCityChange(changedCity: string): void
  {
    this.city = changedCity;
  }

}
