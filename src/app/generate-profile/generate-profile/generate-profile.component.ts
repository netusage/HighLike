import { Component, OnInit } from '@angular/core';
import { LoadDataService } from '../../services/load-data.service';
import { ProfileQuery } from '../../models/profile-query-model';

@Component({
  selector: 'app-generate-profile',
  templateUrl: './generate-profile.component.html',
  styleUrls: ['./generate-profile.component.css']
})
export class GenerateProfileComponent implements OnInit {

  profileQuery: ProfileQuery;

  constructor(private loadDataService: LoadDataService) { }

  ngOnInit() {
  }

  onQueryChange(changedQuery: ProfileQuery): void
  {
    this.profileQuery = changedQuery;
    this.loadDataService.generateProfile(this.profileQuery);
  }

}
