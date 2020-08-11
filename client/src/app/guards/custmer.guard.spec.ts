import { TestBed } from '@angular/core/testing';

import { CustmerGuard } from './custmer.guard';

describe('CustmerGuard', () => {
  let guard: CustmerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustmerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
