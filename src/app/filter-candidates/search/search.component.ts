import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  city: string;

  constructor(){
  }

  ngOnInit() {
  }


  FindPersonsForCity() {
    console.log('People!!!!!');
  }

  
}
