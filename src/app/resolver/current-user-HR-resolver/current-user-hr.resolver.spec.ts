import { TestBed } from '@angular/core/testing';

import { CurrentUserHRResolver } from './current-user-hr.resolver';

describe('CurrentUserHRResolver', () => {
  let resolver: CurrentUserHRResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CurrentUserHRResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
