import { TestBed } from '@angular/core/testing';

import { VoidSignInGuard } from './void-sign-in.guard';

describe('VoidSignInGuard', () => {
  let guard: VoidSignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VoidSignInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
