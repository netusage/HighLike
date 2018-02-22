import { Component, OnInit, Input } from '@angular/core';
import { PersonModel } from '../../models/person-model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  @Input()
  persons: PersonModel[] = [];

  constructor() { 
    

    //this.persons = this.persons;
  }

  ngOnInit() {
    
  }
}
