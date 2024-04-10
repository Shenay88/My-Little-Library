import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BooksService } from '../../Services/Books/books.service';
import { UserService } from '../../Services/User/user.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../utility/loader/loader.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, CommonModule, LoaderComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  block = 'initial';

  bookService = inject(BooksService);
  userService = inject(UserService);

  paramMapSubscription = new Subscription();

  bookId: string | null = null;
  selectedBook: any;
  isUser: boolean = false;
  username: string | undefined = undefined;
  isLoader: boolean = true;
  like: number = 0
  dislike: number = 0
  isClicked: boolean = false;

  ngOnInit(): void {
    this.paramMapSubscription = this.activeRoute.paramMap.subscribe((data) => {
      this.bookId = data.get('id');
      this.isLoader = true;
      this.fetchBookDetails();
      this.isLoader = false;
    });
  }

  fetchBookDetails(): void {
   
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.selectedBook = book;
        this.like = this.selectedBook.likes
        this.dislike = this.selectedBook.dislikes
        if (this.userService.currentUserSignal()?.email === book.ownerId) {
          this.isUser = true;
        }
      });
    } 
  }

  onLikesCount(){
    this.like++;
    this.updateLikesCount();
    this.isClicked = true;
    console.log(this.like)
  }

  onDisikesCount() {
    this.dislike--;
    this.updateLikesCount();
    this.isClicked = true;
  }

  deleteSelectedBook(): void {
    this.isLoader = true;
    if (this.bookId) {
      this.bookService.deleteBook(this.bookId).subscribe(() => {
        this.selectedBook = null;
        this.router.navigate(['/home']);
      });
    }
    this.isLoader = false;
  }

  updateLikesCount(): void {
    if(!this.bookId) {
      return;
    }

    this.selectedBook = {  ...this.selectedBook, likes : this.like, dislikes: this.dislike}


    this.bookService.updateBook(this.bookId, this.selectedBook).subscribe();
  }
}
