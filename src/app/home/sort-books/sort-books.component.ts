import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../Services/Books/books.service';
import { Books } from '../../Model/Books';
import { LoaderComponent } from '../../utility/loader/loader.component';
import { BookCardComponent } from '../../book/book-card/book-card.component';

@Component({
  selector: 'app-sort-books',
  standalone: true,
  imports: [FormsModule, LoaderComponent, BookCardComponent],
  templateUrl: './sort-books.component.html',
  styleUrl: './sort-books.component.css',
})
export class SortBooksComponent {

  activeRoute = inject(ActivatedRoute);
  booksService = inject(BooksService);
  booksList: Books[] = [];
  isLoader: boolean = true;

  sortBtnValue: any;

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((param) => {
      this.sortBtnValue = param.get('sort-name');

      this.booksService.getAllBooks().subscribe({
        next: (books) => {
          this.booksList = books;
          if (this.sortBtnValue === 'newest') {
            this.booksList = books.sort((a, b) => b.createdAt - a.createdAt);
          }

          if (this.sortBtnValue === 'popular') {
            //nullish coalescing operator (??) that provide a default value of 0 if 'likes' is undefined
            this.booksList = books.sort((a, b) => {
              const likesA = a.likesArr?.length ?? 0;
              const likesB = b.likesArr?.length ?? 0;

              return likesB - likesA;
            });
          }

          if (this.sortBtnValue === 'nameAZ') {
            this.booksList = books.sort((a, b) =>
              a.bookTitle.localeCompare(b.bookTitle)
            );
          }

          if (this.sortBtnValue === 'nameZA') {
            this.booksList= books.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
          }

          this.isLoader = false;
        },
      });
    });
  }
}
