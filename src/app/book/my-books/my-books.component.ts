import { Component, inject} from '@angular/core';
import { Books } from '../../Model/Books';
import { UserService } from '../../Services/User/user.service';
import { BooksService } from '../../Services/Books/books.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { LoaderComponent } from '../../utility/loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BookCardComponent, LoaderComponent, SnackbarComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css',
})
export class MyBooksComponent {
  booksService = inject(BooksService);
  userService = inject(UserService);
  isLoader: boolean = false;
  errorMessage: string | null = null;

  myBooks: Books[] = [];
  ownerId: any;

  ngOnInit(): void {
    this.isLoader =  true;
    this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.ownerId = this.userService.currentUserSignal()?.email;
        this.myBooks = books.filter((book) => book.ownerId === this.ownerId);
        this.isLoader = false;
      },
      error:(err) => {

      }
    });

    this.booksService.errorSubject.subscribe({
      next: (httErr: HttpErrorResponse) => {
        this.errorMessage = httErr.error.error;

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
}
