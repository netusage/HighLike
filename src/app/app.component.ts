import { Component } from '@angular/core';
import { LoadDataService } from './services/load-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'High Like';
  public selectedFeature = 'findCandidates';
  
  constructor(private loadDataService: LoadDataService){
    console.log(this.loadDataService.getJSON());
  }
}
