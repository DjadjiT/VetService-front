import { TestBed } from '@angular/core/testing';

import { VetListResolver } from './vet-list.resolver';

describe('VetListResolver', () => {
  let resolver: VetListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VetListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
