import { TestBed } from '@angular/core/testing';

import { HealthRecordServiceService } from './health-record-service.service';

describe('HealthRecordServiceService', () => {
  let service: HealthRecordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthRecordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
