import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService, Order } from '../../../services/order.service';
import AOS from 'aos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  orderForm: FormGroup;
  editingOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      bookTitle: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalAmount: [0, Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
    AOS.init({ duration: 1000 });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (error) => console.error('Error loading orders', error)
    });
  }

  addOrder(): void {
    if (this.orderForm.valid) {
      const newOrder: Order = this.orderForm.value;
      this.orderService.addOrder(newOrder).subscribe({
        next: (order) => {
          this.orders.push(order);
          this.orderForm.reset();
        },
        error: (error) => console.error('Error adding order', error)
      });
    }
  }

  editOrder(order: Order): void {
    this.editingOrder = { ...order };
    this.orderForm.patchValue(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateOrder(): void {
    if (this.editingOrder && this.orderForm.valid) {
      const updatedOrder: Order = { ...this.editingOrder, ...this.orderForm.value };
      this.orderService.updateOrder(updatedOrder).subscribe({
        next: (order) => {
          const index = this.orders.findIndex(o => o.id === order.id);
          if (index !== -1) this.orders[index] = order;
          this.cancelEdit();
        },
        error: (error) => console.error('Error updating order', error)
      });
    }
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.orders = this.orders.filter(order => order.id !== id),
      error: (error) => console.error('Error deleting order', error)
    });
  }

  cancelEdit(): void {
    this.editingOrder = null;
    this.orderForm.reset();
  }
}
