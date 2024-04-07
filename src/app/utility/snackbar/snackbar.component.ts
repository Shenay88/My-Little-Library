import { Component, Input } from '@angular/core';

@Component({
  selector: 'snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
})
export class SnackbarComponent {
  @Input() errorText: string | null = null;
}
