import { TestBed } from '@angular/core/testing';

import { AccountsetupService } from './accountsetup.service';

describe('AccountsetupService', () => {
  let service: AccountsetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
