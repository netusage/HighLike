import { Component } from '@angular/core';
import { LoadDataService } from './services/load-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(private loadDataService: LoadDataService){
    console.log(this.loadDataService.getJSON());
  }
  
}
