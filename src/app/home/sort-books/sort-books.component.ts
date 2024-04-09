import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-books',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sort-books.component.html',
  styleUrl: './sort-books.component.css',
})
export class SortBooksComponent {
  /*
  * 1. We want to pass data to the parent component. We specify what type of data we will emit- in this case we emit <string>. 
  * 2. selectedBtn - it is a property and we asign an instance of event emmiter class - new EventEmitter<string>() - in this way we automatically make that property an event.
  * 3. We want to raise this event whatever the radio button change - (change)="selectedBtn()" - in the HTML.
  * 4. onSelectedBtn() - method - here we raise the event here
  * 5. we need to call emit() - when the event is raised we want to emit a data. the data which we want to emit here is the radio button that the user has selected
  * 6. this.selectedBtn.emit(this.selectedFilter) - show the value depend which button is clicked - in this case - all, newAdded and popular.
  * 7. selectedFilter: string = 'all' - set de value by default. We bind it with [(ngModule)]
  * 8. We need to bind that event in the parent component - (selectedBtn) and there we add the method that we will create in the parent component - onClickFilterChanged() - Look at home component
  */

  @Output() selectedBtn = new EventEmitter<string>();

  selectedFilter: string = 'all'; 

  onSelectedBtn() {
    this.selectedBtn.emit(this.selectedFilter);
  }
}
