import { TestBed } from '@angular/core/testing';

import { HrStatsResolver } from './hr-stats.resolver';

describe('HrStatsResolver', () => {
  let resolver: HrStatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HrStatsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
