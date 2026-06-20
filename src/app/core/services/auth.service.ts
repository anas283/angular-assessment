import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';

const TOKEN_KEY = 'aem_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/account`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(credentials: LoginRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        map(response => this.extractToken(response)),
        tap(token => this.setToken(token))
      );
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/signin']);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  private extractToken(response: string): string {
    try {
      const parsed = JSON.parse(response);
      return parsed.token || parsed;
    } catch {
      return response;
    }
  }
}
