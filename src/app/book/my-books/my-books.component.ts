import { Component, inject} from '@angular/core';
import { Books } from '../../Model/Books';
import { UserService } from '../../Services/User/user.service';
import { BooksService } from '../../Services/Books/books.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { LoaderComponent } from '../../utility/loader/loader.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BookCardComponent, LoaderComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css',
})
export class MyBooksComponent {
  booksService = inject(BooksService);
  userService = inject(UserService);
  isLoader: boolean = false;

  myBooks: Books[] = [];
  ownerId: any;

  ngOnInit(): void {
    this.isLoader =  true;
    this.booksService.getAllBooks().subscribe((books) => {
      this.ownerId = this.userService.currentUserSignal()?.email;
      this.myBooks = books.filter((book) => book.ownerId === this.ownerId);
      this.isLoader = false;
    });
  }
}
