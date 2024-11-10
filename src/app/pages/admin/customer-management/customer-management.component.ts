import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../../services/customer.service';
import AOS from 'aos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  editingCustomer: Customer | null = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCustomers();
    AOS.init({ duration: 1000 });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('Error loading customers', error)
    });
  }

  addCustomer(): void {
    if (this.customerForm.valid) {
      const newCustomer: Customer = this.customerForm.value;
      this.customerService.addCustomer(newCustomer).subscribe({
        next: (customer) => {
          this.customers.push(customer);
          this.customerForm.reset();
        },
        error: (error) => console.error('Error adding customer', error)
      });
    }
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
    this.customerForm.patchValue(customer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateCustomer(): void {
    if (this.editingCustomer && this.customerForm.valid) {
      const updatedCustomer: Customer = { ...this.editingCustomer, ...this.customerForm.value };
      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: (customer) => {
          const index = this.customers.findIndex(c => c.id === customer.id);
          if (index !== -1) this.customers[index] = customer;
          this.cancelEdit();
        },
        error: (error) => console.error('Error updating customer', error)
      });
    }
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.customers = this.customers.filter(customer => customer.id !== id),
      error: (error) => console.error('Error deleting customer', error)
    });
  }

  cancelEdit(): void {
    this.editingCustomer = null;
    this.customerForm.reset();
  }
}
