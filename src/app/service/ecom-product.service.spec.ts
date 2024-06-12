import { TestBed } from '@angular/core/testing';

import { EcomProductService } from './ecom-product.service';

describe('EcomProductService', () => {
  let service: EcomProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
