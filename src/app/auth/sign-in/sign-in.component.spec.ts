import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../core/services/auth.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate empty form', () => {
    expect(component.signInForm.valid).toBeFalse();
  });

  it('should navigate on successful login', () => {
    authService.login.and.returnValue(of('token'));
    component.signInForm.setValue({ username: 'test@example.com', password: 'valid-password' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should display error on failed login', () => {
    authService.login.and.returnValue(throwError(() => ({ error: 'Invalid credentials' })));
    component.signInForm.setValue({ username: 'test@example.com', password: 'wrong' });
    component.onSubmit();

    expect(component.error).toBe('Invalid credentials');
    expect(component.loading).toBeFalse();
  });
});
