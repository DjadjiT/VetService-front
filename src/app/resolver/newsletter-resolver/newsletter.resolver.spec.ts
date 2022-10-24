import { TestBed } from '@angular/core/testing';

import { NewsletterResolver } from './newsletter.resolver';

describe('NewsletterResolver', () => {
  let resolver: NewsletterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewsletterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
