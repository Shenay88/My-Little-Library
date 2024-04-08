import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BooksService } from '../../Services/Books/books.service';

import { BookCardComponent } from '../book-card/book-card.component';
import { LoaderComponent } from '../../utility/loader/loader.component';

import { Books } from '../../Model/Books';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'books-list',
  standalone: true,
  imports: [BookCardComponent, LoaderComponent, SnackbarComponent],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
})
export class BooksListComponent {
  bookService: BooksService = inject(BooksService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  booksList: Books[] = [];
  searchValue: any;
  errorMessage: string | null = null;
  loader: boolean = true;

  ngOnInit() {
    this.getAllBooks();
   
  }

  private getAllBooks() {
    
    this.bookService.getAllBooks().subscribe({
      
      next: (books:any) => {
        
        this.booksList = books;
        this.loader = false;
      },
      error: (err) => {
        this.setErrMessage(err);
        this.loader = false;

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }

  private setErrMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied') { 
      this.errorMessage = 'You do not have permission to perform this action.';
    }
  } 

  // ngOnInit(): void {
  // this.activeRoute.queryParamMap.subscribe((param) => {
  //   this.searchValue = param.get('search');
  //   /*  Every book is a object with book properties --> for(let book of books) { console.log(book)} */
  //   this.bookService.getAllBooks().subscribe({
  //     next: (books) => {
  //       this.loader = false;
  //       if (
  //         this.searchValue === '' ||
  //         this.searchValue === undefined ||
  //         this.searchValue === null
  //       ) {
  //         this.booksList = books;
  //       } else {
  //         this.booksList = books.filter(
  //           (book) =>
  //             book.bookTitle
  //               .toLowerCase()
  //               .includes(this.searchValue.toLowerCase()) ||
  //             book.authorName
  //               .toLowerCase()
  //               .includes(this.searchValue.toLowerCase()) ||
  //             book.category
  //               .toLowerCase()
  //               .includes(this.searchValue.toLowerCase())
  //         );
  //       }
  //     },
  //   });
  // });
  // }
}
