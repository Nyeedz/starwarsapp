import { TestBed } from '@angular/core/testing';

import { CustomFilmsService } from './custom-films.service';

describe('CustomFilmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomFilmsService = TestBed.get(CustomFilmsService);
    expect(service).toBeTruthy();
  });
});
