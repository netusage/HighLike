import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { By } from '@angular/platform-browser';
import { ResultsComponent } from './filter-candidates/results/results.component';
import { SearchComponent } from './filter-candidates/search/search.component';
import { LoadDataService } from './services/load-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadDataServiceMock } from './services/load-data-service-mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        ResultsComponent,
        SearchComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: LoadDataService, useClass: LoadDataServiceMock }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('High Like');
  }));
  it('should select feature \'filterCandidatesNavbarItem\' on init', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element1 = fixture.debugElement.query(By.css('#filterCandidatesNavbarItem'));
      expect(element1.nativeElement.classList).toContain('active');
      const element2 = fixture.debugElement.query(By.css('#generateProfileNavbarItem'));
      expect(element2.nativeElement.classList).not.toContain('active');
    });
  }));
});
