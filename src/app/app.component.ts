import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarGuestComponent } from './common/nav-bar-guest/nav-bar-guest.component';
import { NavBarCustomerComponent } from './common/nav-bar-customer/nav-bar-customer.component';
import { NavBarAdminComponent } from './common/nav-bar-admin/nav-bar-admin.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf,
    RouterOutlet,
    NavBarGuestComponent,
    NavBarCustomerComponent,
    NavBarAdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-manage-system';

  constructor(public authService: AuthService) {}
}