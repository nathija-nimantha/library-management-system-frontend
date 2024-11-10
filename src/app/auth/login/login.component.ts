import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import AOS from 'aos';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  email = '';
  password = '';
  name = '';
  phone = '';
  address = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    AOS.init({ duration: 1000 });
  }

  toggleMode(isLogin: boolean): void {
    this.isLoginMode = isLogin;
    this.errorMessage = null;
    this.successMessage = null;
  }

  onLogin(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (role: string) => {
        this.isLoading = false;
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'customer') {
          this.router.navigate(['/customer/dashboard']);
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  onSignUp(): void {
    if (!this.validateSignupForm()) return;

    const customerData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      password: this.password
    };

    this.isLoading = true;
    this.authService.register(customerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Please log in.';
        this.toggleMode(true);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Email may already be in use.';
      }
    });
  }

  validateSignupForm(): boolean {
    this.errorMessage = null;

    if (!this.email || !this.password || !this.name || !this.phone || !this.address) {
      this.errorMessage = 'All fields are required.';
      return false;
    }

    if (!/^0[0-9]{9}$/.test(this.phone)) {
      this.errorMessage = 'Phone number must start with 0 and have exactly 10 digits.';
      return false;
    }

    return true;
  }
}
