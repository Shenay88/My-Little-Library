import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BooksService } from '../../Services/Books/books.service';
import { UserService } from '../../Services/User/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../utility/loader/loader.component';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LoaderComponent,
    DatePipe,
    SnackbarComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  booksService = inject(BooksService);
  userService = inject(UserService);

  paramMapSubscription = new Subscription();

  bookId: string | null = null;
  selectedBook: any;
  isLoader: boolean = true;
  isClicked: boolean = false;
  errorMessage: string | null | undefined = '';
  userEmail: string | undefined | null = undefined;

  ngOnInit(): void {
    this.paramMapSubscription = this.activeRoute.paramMap.subscribe((data) => {
      this.bookId = data.get('bookId');
      this.fetchBookDetails();
      this.userEmail = this.userService.currentUserSignal()?.email;
    });
  }

  fetchBookDetails(): void {
    if (this.bookId) {
      this.booksService.getBookById(this.bookId).subscribe((book) => {
        this.selectedBook = book;
        this.isLoader = false;
        
      });
    }
  }

  deleteSelectedBook(): void {
    this.isLoader = true;
    if (this.bookId) {
      this.booksService.deleteBook(this.bookId).subscribe(() => {
        this.selectedBook = null;
        this.router.navigate(['/home']);
      });
    }
    this.isLoader = false;
  }

  handleButtonClick(btnName: string) {
    if (!this.bookId) {
      return;
    }

    if (!this.userEmail) {
      this.errorMessage = 'User email is undefined. Please log in again.';

      setTimeout(() => {
        this.errorMessage = null;
        this.router.navigate(['/home']);
      }, 3000);
      return;
    }

    if (btnName === 'like') {
      // Ensure likesArr is initialized as an array
      this.selectedBook.likesArr = this.selectedBook.likesArr || [];

      let emailExistsInLikes = false;
      for (const email of this.selectedBook.likesArr) {
        if (email === this.userEmail) {
          emailExistsInLikes = true;
          break;
        }
      }

      if (!emailExistsInLikes) {
        this.selectedBook.likesArr.push(this.userEmail);
      }
      this.isClicked = true;
    }

    if (btnName === 'dislike') {

         // Ensure dislikesArr is initialised as an array
         this.selectedBook.dislikesArr = this.selectedBook.dislikesArr || [];
      
         let emailExistsInDislikes = false;
         for (const email of this.selectedBook.dislikesArr) {
           if (email === this.userEmail) {
             emailExistsInDislikes = true;
             break;
           }
         }

         if (!emailExistsInDislikes) {
           this.selectedBook.dislikesArr.push(this.userEmail);
         }
      this.isClicked = true;
    }

    this.booksService.updateBook(this.bookId, this.selectedBook).subscribe();
   
  }

  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
  }
}
