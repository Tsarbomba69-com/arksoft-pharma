import { TestBed } from '@angular/core/testing';

import { AllowAnonymousGuard } from './allow-anonymous.guard';

describe('AllowAnonymousGuard', () => {
  let guard: AllowAnonymousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllowAnonymousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
