import { Component, OnInit, Input } from '@angular/core';
import { ProfileModel } from '../../models/profile-model';

@Component({
  selector: 'app-gp-results',
  templateUrl: './gp-results.component.html',
  styleUrls: ['./gp-results.component.css']
})
export class GpResultsComponent implements OnInit {

  @Input() profiles: ProfileModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
