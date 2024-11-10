import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import AOS from 'aos';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  email = '';
  password = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    AOS.init({ duration: 1000 });
  }

  toggleMode(isLogin: boolean) {
    this.isLoginMode = isLogin;
    this.errorMessage = null;
    this.successMessage = null;
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (role: string) => {
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'customer') {
          this.router.navigate(['/customer/dashboard']);
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  onSignUp(): void {
    const customerData = {
      name: this.email,
      email: this.email,
      password: this.password
    };

    this.authService.register(customerData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please log in.';
        this.toggleMode(true);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Email may already be in use.';
      }
    });
  }
}
