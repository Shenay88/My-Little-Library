import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../Services/User/user.service';
import { SearchBoxComponent } from '../home/search-box/search-box.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,SearchBoxComponent, BottomNavComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userService = inject(UserService);
  router = inject(Router);
  name!: string | undefined;
  isUser: boolean = false;

  @Input() user!: string;

  ngOnInit() {
    if (!this.userService.currentUserSignal()) {
      this.isUser = true;
      this.name = this.userService.currentUserSignal()?.username;
    }
    if (this.userService.currentUserSignal() === null) {
      this.isUser = false;
    }
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
