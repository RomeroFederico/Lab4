import { TestBed, inject } from '@angular/core/testing';

import { PruebaServiceService } from './prueba-service.service';

describe('PruebaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PruebaServiceService]
    });
  });

  it('should ...', inject([PruebaServiceService], (service: PruebaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
