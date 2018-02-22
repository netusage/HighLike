import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()  cityEmiter: EventEmitter<string> = new EventEmitter<string>();
  
  public city: string;

  constructor() { }

  ngOnInit() {
  }

  FindPersonsForCity() {
    this.cityEmiter.emit(this.city);
  }

  
}
