import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  persons: Person[] = []; 
  constructor() { 
    var person: Person = { name: "משה משה", address: "המשעול 5 רמת גן"};
    this.persons.push(person);
  }
  

  ngOnInit() {
  }

  
}
interface Person {
  name: string;
  address: string;
}
