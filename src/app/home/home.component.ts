import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BooksService } from '../Services/Books/books.service';

import { Books } from '../Model/Books';
import { BookCardComponent } from '../book/book-card/book-card.component';
import { LoaderComponent } from '../utility/loader/loader.component';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookCardComponent,
    LoaderComponent,
    SnackbarComponent,
    SearchBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [],
})
export class HomeComponent implements OnInit {
  bookService: BooksService = inject(BooksService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  booksList: Books[] = [];
  searchValue: any;
  errorMessage: string | null = null;
  loader: boolean = true;
  isEmpty: boolean = false;

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((param) => {
     
      this.searchValue = param.get('search');

      this.bookService.getAllBooks().subscribe({
        next: (books: any) => {
          this.loader = false;
          
          if (
            this.searchValue === '' ||
            this.searchValue === undefined ||
            this.searchValue === null
          ) {
            this.booksList = books;
          } else {
            this.booksList = books.filter(
              (book: any) =>
                book.bookTitle
                  .toLowerCase()
                  .includes(this.searchValue.toLowerCase()) ||
                book.authorName
                  .toLowerCase()
                  .includes(this.searchValue.toLowerCase()) ||
                book.category
                  .toLowerCase()
                  .includes(this.searchValue.toLowerCase())
            );
          }
        },
        error: (err) => {
          if (err.error.error === 'Permission denied') {
            this.errorMessage =
              'You do not have permission to perform this action.';
          }
          this.loader = false;

          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        },
      });
    });
  }
}
