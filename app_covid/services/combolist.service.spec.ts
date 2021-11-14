import { TestBed } from '@angular/core/testing';

import { CombolistService } from './combolist.service';

describe('CombolistService', () => {
  let service: CombolistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombolistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
