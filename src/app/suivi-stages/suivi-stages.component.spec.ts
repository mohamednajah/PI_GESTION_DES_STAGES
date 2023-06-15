import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviStagesComponent } from './suivi-stages.component';

describe('SuiviStagesComponent', () => {
  let component: SuiviStagesComponent;
  let fixture: ComponentFixture<SuiviStagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuiviStagesComponent]
    });
    fixture = TestBed.createComponent(SuiviStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
