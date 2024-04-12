import { Component, inject} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
 
export class BottomNavComponent {

  router = inject(Router);

  onClick(btnValue: string){
    this.router.navigate(['/sort-books'], {queryParams: {'sort-name': btnValue}})
  }

  
}
