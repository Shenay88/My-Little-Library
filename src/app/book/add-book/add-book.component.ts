import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { BooksService } from '../../Services/Books/books.service';
import { Books } from '../../Model/Books';
import { Router, RouterLink } from '@angular/router';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, RouterLink, SnackbarComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  /* EXPLANATION
   * 1. I am using Template Driven Forms. At each input in HTML I added name attribute. With these names will be created properties in the ngForm object. Then I added ngModel directive to each of these input. Then I created template refference variable - #bookForm - and I asigned ngForm - #bookForm="ngForm". ngForm is a Directive which will store a template driven form. When the submit button is clicked the form will be submitted and whenever the form will be submitted and event called ngSubmit will be happen. When this ngSubmit event happen I am execute some logic and we pass the template refference - (ngSubmit)="addNewBook(bookForm)".
   */

  bookService: BooksService = inject(BooksService);
  router: Router = inject(Router);
  userService = inject(UserService);

  errMessage: string | null = null;
  bookTitle: any;
  book: Books = {
    bookTitle: '',
    authorName: '',
    category: '',
    imageURL: '',
    ageFrom: 0,
    ageTo: 0,
    description: '',
    createdAt: 0,
  };

  ngOnInit() {
    this.bookService.errorSubject.subscribe({
      next: (httErr) => {
        this.errMessage = httErr.error.error;

        setTimeout(() => {
          this.errMessage = null;
        }, 3000);
      },
    });
  }

  addNewBook(bookForm: NgForm) {
    const createdAt = Date.now();
    const ownerId = this.userService.currentUserSignal()?.email;
    const username = this.userService.currentUserSignal()?.username;

    this.book = { ...bookForm.value, createdAt, ownerId , username, likes: 0};

    this.bookService.createBook(this.book).subscribe({
      next: () => {
        this.router.navigate(['/my-books']);
      },
    });
  }
}
