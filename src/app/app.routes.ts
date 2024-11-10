import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { BookCatalogComponent } from './pages/customer/book-catalog/book-catalog.component';
import { CartComponent } from './pages/customer/cart/cart.component';
import { BookManagementComponent } from './pages/admin/book-management/book-management.component';
import { CustomerManagementComponent } from './pages/admin/customer-management/customer-management.component';
import { OrderManagementComponent } from './pages/admin/order-management/order-management.component';
import { CustomerDashboardComponent } from './pages/customer/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer/dashboard', component: CustomerDashboardComponent },
  { path: 'customer/books', component: BookCatalogComponent },
  { path: 'customer/cart', component: CartComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/books', component: BookManagementComponent },
  { path: 'admin/customers', component: CustomerManagementComponent },
  { path: 'admin/orders', component: OrderManagementComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
