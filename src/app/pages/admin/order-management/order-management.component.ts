import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService, Order } from '../../../services/order.service';
import { CustomerService, Customer } from '../../../services/customer.service';
import { BookService, Book } from '../../../services/book.service';
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
  customers: Customer[] = [];
  books: Book[] = [];
  statusOptions = [
    'Pending',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Returned',
    'Refunded',
    'On Hold',
    'Completed'
];
  orderForm: FormGroup;
  editingOrder: Order | null = null;
  selectedBook1: number | null = null;
  selectedBook2: number | null = null;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      bookId1: ['', Validators.required],
      bookId2: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalAmount: [{ value: 0, disabled: true }],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadCustomers();
    this.loadBooks();
    AOS.init({ duration: 1000 });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (error) => console.error('Error loading orders', error)
    });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('Error loading customers', error)
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (error) => console.error('Error loading books', error)
    });
  }

  addOrder(): void {
    if (this.orderForm.valid) {
      const newOrder: Order = this.orderForm.value;
      this.orderService.addOrder(newOrder).subscribe({
        next: (order) => {
          this.orders.push(order);
          this.orderForm.reset();
          this.selectedBook1 = null;
          this.selectedBook2 = null;
        },
        error: (error) => console.error('Error adding order', error)
      });
    }
  }

  editOrder(order: Order): void {
    this.editingOrder = { ...order };
    this.orderForm.patchValue(order);
    this.selectedBook1 = this.orderForm.get('bookId1')?.value ?? null;
    this.selectedBook2 = this.orderForm.get('bookId2')?.value ?? null;    
    this.updateTotalAmount();
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
    this.selectedBook1 = null;
    this.selectedBook2 = null;
  }

  onBook1Selected(): void {
    this.selectedBook1 = this.orderForm.get('bookId1')?.value ?? null;
    this.updateTotalAmount();
  }

  onBook2Selected(): void {
    this.selectedBook2 = this.orderForm.get('bookId2')?.value ?? null;
    this.updateTotalAmount();
  }

  updateTotalAmount(): void {
    const book1 = this.books.find(book => book.id === this.selectedBook1);
    const book2 = this.books.find(book => book.id === this.selectedBook2);
    const quantity = this.orderForm.get('quantity')?.value || 1;

    const book1Price = book1?.price ?? 0;
    const book2Price = book2?.price ?? 0;
    const totalPrice = (book1Price + book2Price) * quantity;

    this.orderForm.get('totalAmount')?.setValue(totalPrice);
  }
}
