import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar-customer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar-customer.component.html',
  styleUrl: './nav-bar-customer.component.css'
})
export class NavBarCustomerComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
