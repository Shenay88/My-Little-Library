import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'search-box',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {

  router: Router = inject(Router);

  onSearch(searchValue: string){
    this.router.navigate(['/home'], {queryParams: {search: searchValue}})

  }
}
