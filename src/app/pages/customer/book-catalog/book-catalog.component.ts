import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import AOS from 'aos';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-book-catalog',
  imports: [CommonModule],
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;

  constructor(private bookService: BookService, private cartService: CartService) {}

  ngOnInit(): void {
    AOS.init({ duration: 500, once: true });
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log('Books loaded:', this.books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  addToCart(book: any): void {
    const cart = this.cartService.getCart();
    if (cart.length >= 2) {
      this.errorMessage = 'You can only add up to 2 books at a time.';
      return;
    }

    if (cart.some(item => item.id === book.id)) {
      this.errorMessage = 'This book is already in your cart.';
      return;
    }

    this.cartService.addToCart(book);
    this.errorMessage = null;
    alert(`${book.title} added to your cart.`);
  }
}
