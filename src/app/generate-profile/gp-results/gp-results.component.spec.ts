import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpResultsComponent } from './gp-results.component';

describe('GpResultsComponent', () => {
  let component: GpResultsComponent;
  let fixture: ComponentFixture<GpResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
