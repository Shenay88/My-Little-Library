import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BooksService } from '../../Services/Books/books.service';

import { Books } from '../../Model/Books';

import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [FormsModule, CommonModule, SnackbarComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit, OnDestroy {
  bookService: BooksService = inject(BooksService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  errSubUnsub: Subscription = new Subscription();

  errMessage: string | null = null;
  bookId: string | null = null;
  selectedBook: Books = {
    bookTitle: '',
    authorName: '',
    category: '',
    imageURL: '',
    ageFrom: 0,
    ageTo: 0,
    description: '',
    likes: 0,
  };

  constructor() {}

  ngOnInit(): void {
    // this.bookId = this.activeRoute.snapshot.paramMap.get('id');

    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.bookId = paramMap.get('id');

      if (this.bookId) {
        this.bookService.getBookById(this.bookId).subscribe({
          next: (book) => {
            this.selectedBook = book;
          },
          error: (err) => {
            this.errMessage = err.message;
          },
        });
      }
    });

    this.errSubUnsub = this.bookService.errorSubject.subscribe({
      next: (httErr) => {
        this.errMessage = httErr.error.error;

        setTimeout(() => {
          this.errMessage = null;
        }, 3000);
      },
    });
  }

  ngOnDestroy(): void {
    this.errSubUnsub.unsubscribe();
  }

  editBook(editBookForm: NgForm): void {
    if (!this.bookId) return;

    this.selectedBook = editBookForm.value;

    this.bookService.updateBook(this.bookId, this.selectedBook).subscribe({
      next: () => {
        this.router.navigate(['/books/book-details/', this.bookId]);
      },
      error: (err) => {
        this.errMessage = err.message;
      },
    });
  }
}
