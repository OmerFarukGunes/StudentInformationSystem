import { TestBed } from '@angular/core/testing';

import { SchoolInfoService } from './school-info.service';

describe('SchoolInfoService', () => {
  let service: SchoolInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
