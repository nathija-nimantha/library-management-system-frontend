import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  isAuthenticated = false;
  userRole: 'guest' | 'admin' | 'customer' = 'guest';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<string> {
    const credentials = { email, password };

    return this.http.post<{ role: string }>(`${this.baseUrl}/login`, credentials).pipe(
      map((response) => {
        const role = response.role;
        if (role === 'admin' || role === 'customer') {
          this.isAuthenticated = true;
          this.userRole = role as 'admin' | 'customer';
          localStorage.setItem('userRole', role);
          
          if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/customer/dashboard']);
          }
          
          return role;
        }
        throw new Error('Invalid role');
      }),
      catchError((error) => {
        console.error('Login failed', error);
        this.isAuthenticated = false;
        this.userRole = 'guest';
        return throwError('Invalid email or password');
      })
    );
  }

  register(customerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, customerData).pipe(
      map((response: any) => response),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError('Registration failed');
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = 'guest';
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

  isCustomer(): boolean {
    return this.isAuthenticated && this.userRole === 'customer';
  }

  isAdmin(): boolean {
    return this.isAuthenticated && this.userRole === 'admin';
  }

  isGuest(): boolean {
    return !this.isAuthenticated;
  }

  getRole(): string {
    return this.userRole;
  }
}
