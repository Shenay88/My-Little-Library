import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BooksService } from '../../Services/Books/books.service';

import { Books } from '../../Model/Books';

import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';
import { LoaderComponent } from '../../utility/loader/loader.component';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [FormsModule, CommonModule, SnackbarComponent, LoaderComponent],
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
  isLoader: boolean = true;
  selectedBook: Books = {
    bookTitle: '',
    authorName: '',
    category: '',
    imageURL: '',
    ageFrom: 0,
    ageTo: 0,
    description: '',
    bookId: '',
    ownerId: '',
    createdAt: 0,
    username: '',
  };

  ngOnInit(): void {
    /* EXPLANATION 
    
    !Error Handling in Component
    * 1. In the component, we handle errors that occur specifically during the retrieval of a single book (getBookById). This allows us to provide immediate feedback to the user if there's an issue fetching the book data. For example, if there's a network error or the requested book doesn't exist.

    !ErrorSubject from the BooksService
    * 1. Allows us to capture any general errors that might occur during HTTP requests in the service. This provides a centralised way to handle errors that occur across multiple operations in the service.
     */

    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = paramMap.get('id');

      if (this.bookId) {
        this.isLoader = true;
        this.bookService.getBookById(this.bookId).subscribe({
          next: (book) => {
            this.selectedBook = book;
            this.isLoader = false;
          },
          error: (err) => {
            this.errMessage = err.message;
            this.isLoader = false;
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

    this.selectedBook = { ...this.selectedBook, ...editBookForm.value };

    this.bookService.updateBook(this.bookId, this.selectedBook).subscribe({
      next: () => {
        this.isLoader = false;
        this.router.navigate(['/books/book-details/', this.bookId]);
      },
      error: (err) => {
        this.errMessage = err.message;
        this.isLoader = false; 
      },
    });
  }
}
