import { Component } from '@angular/core';
import { BooksListComponent } from '../book/books-list/books-list.component';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BooksListComponent, SearchBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [],
})
export class HomeComponent {}
