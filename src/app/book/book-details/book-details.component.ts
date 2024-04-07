import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Books } from '../../Model/Books';
import { Subject, Subscription } from 'rxjs';
import { BooksService } from '../../Services/Books/books.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  paramMapSubscription: Subscription = new Subscription();
  bookId: string | null = null;
  selectedBook: any;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  bookService: BooksService = inject(BooksService);
  router: Router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.paramMapSubscription = this.activeRoute.paramMap.subscribe((data) => {
      this.bookId = data.get('id');
      this.fetchBookDetails();
    });
  }

  fetchBookDetails(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.selectedBook = book;
      });
    }
  }

  deleteSelectedBook(): void {

    if (this.bookId) {
      // Clear selectedBook immediately
      this.selectedBook = null;

      this.bookService.deleteBook(this.bookId).subscribe(() => {
        this.paramMapSubscription.unsubscribe(); // Unsubscribe from paramMapSubscription
        this.router.navigate(['/home']);
      });
    }
  }

  // ngOnDestroy(): void {
  //   this.paramMapSubscription.unsubscribe();
  // }
}
