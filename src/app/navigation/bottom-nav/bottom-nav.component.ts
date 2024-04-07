import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BooksService } from '../../Services/Books/books.service';
import { Books } from '../../Model/Books';
import { BooksListComponent } from '../../book/books-list/books-list.component';

@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BooksListComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
 
//TODO redirect routes - lessons - #86 and #87
export class BottomNavComponent {
  
  // bookService: BooksService = inject(BooksService);
  // router: Router = inject(Router);

  // books!: Books[];
  // title: string = "";

  // ngOnInit() {
  //   this.allBooks();
  // }

  // allBooks() {
  //   this.bookService.getAllBooks().subscribe((booksData:Books[]) => {
  //     this.books = booksData;
  //   })
  // }

}
