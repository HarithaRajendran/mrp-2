import { TestBed } from '@angular/core/testing';

import { CountryAndStateService } from './country-and-state.service';

describe('CountryAndStateService', () => {
  let service: CountryAndStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryAndStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
