import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';

  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(book: any): void {
    const cart = this.getCart();
    if (cart.length >= 2) {
      alert('You can only add up to 2 books at a time.');
      return;
    }

    if (!cart.some(item => item.id === book.id)) {
      cart.push(book);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    } else {
      alert('This book is already in your cart.');
    }
  }

  updateCart(cartItems: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
