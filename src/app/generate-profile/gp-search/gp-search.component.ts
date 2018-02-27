import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileQuery } from '../../models/profile-query-model';

@Component({
  selector: 'app-gp-search',
  templateUrl: './gp-search.component.html',
  styleUrls: ['./gp-search.component.css']
})
export class GpSearchComponent implements OnInit {

  @Output() profileQueryChanged: EventEmitter<ProfileQuery> = new EventEmitter<ProfileQuery>();

  private profileQuery = new ProfileQuery();

  constructor() { }

  ngOnInit() {
  }

  generateProfile({ value, valid }: { value: ProfileQuery, valid: boolean }) {
    this.profileQuery = value;
    this.profileQueryChanged.emit(this.profileQuery);
  }

}
