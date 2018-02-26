import { Component, OnInit, Input } from '@angular/core';
import { PersonModel } from '../models/person-model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  @Input()
  person: PersonModel;

  constructor() { }

  ngOnInit() {
  }

}
