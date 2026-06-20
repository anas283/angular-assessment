import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DashboardService } from './dashboard.service';
import { environment } from '../../environments/environment';
import { DashboardResponse } from './models/dashboard-response.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDashboardData', () => {
    it('should make a GET request and return dashboard data', () => {
      const mockResponse: DashboardResponse = {
        success: true,
        chartDonut: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }],
        chartBar: [{ name: 'X', value: 30 }],
        tableUsers: [
          { firstName: 'John', lastName: 'Doe', username: 'john_doe' },
          { firstName: 'Jane', lastName: 'Smith', username: 'jane_smith' }
        ]
      };

      service.getDashboardData().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dashboard`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
