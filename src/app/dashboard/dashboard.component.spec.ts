import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from './dashboard.service';
import { DashboardResponse } from './models/dashboard-response.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
  const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getDashboardData']);

  const mockResponse: DashboardResponse = {
    success: true,
    chartDonut: [{ name: 'A', value: 10 }],
    chartBar: [{ name: 'B', value: 20 }],
    tableUsers: [{ firstName: 'John', lastName: 'Doe', username: 'john_doe' }]
  };

  beforeEach(async () => {
    dashboardServiceSpy.getDashboardData.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
