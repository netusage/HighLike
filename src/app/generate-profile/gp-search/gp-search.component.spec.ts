import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpSearchComponent } from './gp-search.component';

describe('GpSearchComponent', () => {
  let component: GpSearchComponent;
  let fixture: ComponentFixture<GpSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
