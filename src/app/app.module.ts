import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { LoadDataService } from './services/load-data.service';
import { HttpClientModule } from '@angular/common/http';

import { ResultsComponent } from './filter-candidates/results/results.component';
import { SearchComponent } from './filter-candidates/search/search.component';
import { FilterCandidatesComponent } from './filter-candidates/filter-candidates.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PersonCardComponent } from './person-card/person-card.component';
import { ReviewComponent } from './review/review.component';
import { GpSearchComponent } from './generate-profile/gp-search/gp-search.component';
import { GpResultsComponent } from './generate-profile/gp-results/gp-results.component';
import { GenerateProfileComponent } from './generate-profile/generate-profile/generate-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    SearchComponent,
    FilterCandidatesComponent,
    FilterPipe,
    PersonCardComponent,
    ReviewComponent,
    GpSearchComponent,
    GpResultsComponent,
    GenerateProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    LoadDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
