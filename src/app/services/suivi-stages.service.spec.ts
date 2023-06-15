import { TestBed } from '@angular/core/testing';

import { SuiviStagesService } from './suivi-stages.service';

describe('SuiviStagesService', () => {
  let service: SuiviStagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviStagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
