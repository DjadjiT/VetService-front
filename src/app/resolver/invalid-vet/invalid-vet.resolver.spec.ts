import { TestBed } from '@angular/core/testing';

import { InvalidVetResolver } from './invalid-vet.resolver';

describe('InvalidVetResolver', () => {
  let resolver: InvalidVetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InvalidVetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
