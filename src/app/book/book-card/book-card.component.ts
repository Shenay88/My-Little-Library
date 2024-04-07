import { Component, Input, inject } from '@angular/core';
import { Books } from '../../Model/Books';
import { RouterLink } from '@angular/router';
import { BooksListComponent } from '../books-list/books-list.component';


@Component({
  selector: 'book-card',
  standalone: true,
  imports: [BooksListComponent, RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  // Using ! indicates that book will be initialized later
  // Marked as optional with `?`
  @Input() book!: Books;

}
