import { TestBed } from '@angular/core/testing';

import { AppStatsResolver } from './app-stats.resolver';

describe('AppStatsResolver', () => {
  let resolver: AppStatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AppStatsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
