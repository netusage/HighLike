import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProfileComponent } from './generate-profile.component';

describe('GenerateProfileComponent', () => {
  let component: GenerateProfileComponent;
  let fixture: ComponentFixture<GenerateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
