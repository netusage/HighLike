import { Component } from '@angular/core';
import { LoadDataService } from './services/load-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'High Like';
  selectedFeature = 'filterCandidates';
  
  constructor(private loadDataService: LoadDataService){
    localStorage.clear();
    //console.log(this.loadDataService.getJSON());
  }
}
