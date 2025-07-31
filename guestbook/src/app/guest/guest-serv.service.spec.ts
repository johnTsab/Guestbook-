import { TestBed } from '@angular/core/testing';

import { GuestServService } from './guest-serv.service';

describe('GuestServService', () => {
  let service: GuestServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
