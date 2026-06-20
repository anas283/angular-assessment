import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const apiUrl = `${environment.apiUrl}/account/login`;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sessionStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const credentials = { username: 'test@example.com', password: 'Test@123' };

    it('should send POST request and store token from JSON response', () => {
      const responseText = JSON.stringify({ token: 'jwt-token-123' });

      service.login(credentials).subscribe(token => {
        expect(token).toBe('jwt-token-123');
        expect(sessionStorage.getItem('aem_token')).toBe('jwt-token-123');
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(responseText);
    });

    it('should handle plain text token response', () => {
      service.login(credentials).subscribe(token => {
        expect(token).toBe('plain-token');
        expect(sessionStorage.getItem('aem_token')).toBe('plain-token');
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('plain-token');
    });
  });

  describe('logout', () => {
    it('should remove token and navigate to signin', () => {
      sessionStorage.setItem('aem_token', 'some-token');
      service.logout();

      expect(sessionStorage.getItem('aem_token')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/signin']);
    });
  });

  describe('getToken', () => {
    it('should return token from sessionStorage', () => {
      sessionStorage.setItem('aem_token', 'stored-token');
      expect(service.getToken()).toBe('stored-token');
    });

    it('should return null when no token exists', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      sessionStorage.setItem('aem_token', 'some-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false when no token exists', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
