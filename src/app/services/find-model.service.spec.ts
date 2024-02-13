import { TestBed } from '@angular/core/testing';

import { FindModelService } from './find-model.service';

describe('FindModelService', () => {
  let service: FindModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
