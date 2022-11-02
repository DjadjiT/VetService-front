import { TestBed } from '@angular/core/testing';

import { OrderInPreparationListResolver } from './order-in-preparation-list-resolver.service';

describe('OrderListResolver', () => {
  let resolver: OrderInPreparationListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderInPreparationListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
