import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { By } from '@angular/platform-browser';
import { ResultsComponent } from './filter-candidates/results/results.component';
import { SearchComponent } from './filter-candidates/search/search.component';
import { LoadDataService } from './services/load-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadDataServiceMock } from './services/load-data-service-mock';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#title'));
    expect(element.nativeElement.textContent).toBe('High Like');
  }));
  it('should select feature \'filterCandidatesButton\' on init', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element1 = fixture.debugElement.query(By.css('#findCandidatesButton'));
      expect(element1.nativeElement.checked).toBe(true);
      const element2 = fixture.debugElement.query(By.css('#generateProfileButton'));
      expect(element2.nativeElement.checked).toBe(false);
    });
  }));
});
