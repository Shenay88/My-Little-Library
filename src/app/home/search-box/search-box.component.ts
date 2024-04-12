import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SortBooksComponent } from '../sort-books/sort-books.component';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SortBooksComponent],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {

  router: Router = inject(Router);
  cleanInput: string = ''

  onSearch(searchValue: string){
    this.router.navigate(['/home'], {queryParams: {search: searchValue}})

  }

  emptyInput() {
    this.cleanInput = ''; // Clear the search input value
  }
}
