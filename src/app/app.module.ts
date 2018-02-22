import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { LoadDataService } from './services/load-data.service';
import { HttpClientModule } from '@angular/common/http';

import { ResultsComponent } from './filter-candidates/results/results.component';
import { SearchComponent } from './filter-candidates/search/search.component';
import { FilterCandidatesComponent } from './filter-candidates/filter-candidates.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    SearchComponent,
    FilterCandidatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    LoadDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
