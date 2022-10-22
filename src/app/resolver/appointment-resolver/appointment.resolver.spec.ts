import { TestBed } from '@angular/core/testing';

import { AppointmentResolver } from './appointment.resolver';

describe('AppointmentResolver', () => {
  let resolver: AppointmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AppointmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
