import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCandidatesComponent } from './filter-candidates.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { LoadDataServiceMock } from '../services/load-data-service-mock';

describe('FilterCandidatesComponent', () => {
  let component: FilterCandidatesComponent;
  let fixture: ComponentFixture<FilterCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ FilterCandidatesComponent ],
      providers: [
        { provide: LoadDataService, useClass: LoadDataServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
