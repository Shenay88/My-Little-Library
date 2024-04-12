import { Component, Input } from '@angular/core';
import { Books } from '../../Model/Books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book!: Books
}
