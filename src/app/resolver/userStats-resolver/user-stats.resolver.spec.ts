import { TestBed } from '@angular/core/testing';

import { UserStatsResolver } from './user-stats.resolver';

describe('UserStatsResolver', () => {
  let resolver: UserStatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserStatsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
