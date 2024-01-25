import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService  } from './currency.service';

describe('CurrencyService', () => {
  let currencyService: CurrencyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });

    currencyService = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(currencyService).toBeTruthy();
  });

  it('should return multiplication factor for a currency', () => {
    const mockResponse = {
      conversion_rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
      },
    };

    const currency = 'EUR';

    currencyService.getCurrency(currency).subscribe((factor) => {
      expect(factor).toBe(mockResponse.conversion_rates[currency]);
    });

    const req = httpTestingController.expectOne(currencyService['apiUrl']);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should handle API error', () => {
    const currency = 'EUR';

    currencyService.getCurrency(currency).subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Error en la llamada a la API');
      }
    );

    const req = httpTestingController.expectOne(currencyService['apiUrl']);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('HTTP error'), { status: 500, statusText: 'Internal Server Error' });
  });
});
