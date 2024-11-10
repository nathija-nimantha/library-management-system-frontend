import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService, Book } from '../../../services/book.service';
import AOS from 'aos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  editingBook: Book | null = null;
  categories: string[] = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Horror',
    'Biography',
    'Self-Help',
    'Historical',
    'Adventure',
    'Children',
    'Thriller'
  ];

  constructor(
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      availability: [true],
      price: [0, Validators.required],
      rating: [5]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    AOS.init({ duration: 100 });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Error loading books', error);
      }
    });
  }

  addBook(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).subscribe({
        next: (book) => {
          this.books.push(book);
          this.bookForm.reset();
        },
        error: (error) => {
          console.error('Error adding book', error);
        }
      });
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };
    this.bookForm.patchValue(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateBook(): void {
    if (this.editingBook && this.bookForm.valid) {
      const updatedBook: Book = { ...this.editingBook, ...this.bookForm.value };
      this.bookService.updateBook(updatedBook).subscribe({
        next: (book) => {
          const index = this.books.findIndex(b => b.id === book.id);
          if (index !== -1) {
            this.books[index] = book;
          }
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating book', error);
        }
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
      },
      error: (error) => {
        console.error('Error deleting book', error);
      }
    });
  }

  cancelEdit(): void {
    this.editingBook = null;
    this.bookForm.reset();
  }
}
