import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../Services/User/user.service';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BottomNavComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isUser: boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  name!: string | undefined;

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
