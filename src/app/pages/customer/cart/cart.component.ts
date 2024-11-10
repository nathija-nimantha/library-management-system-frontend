import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(book: any): void {
    this.cartItems = this.cartItems.filter(item => item.id !== book.id);
    this.cartService.updateCart(this.cartItems);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  proceedToCheckout(): void {
    alert('Proceeding to checkout...');
    this.cartService.clearCart();
    this.cartItems = [];
    this.router.navigate(['/customer/books']); 
  }
}
