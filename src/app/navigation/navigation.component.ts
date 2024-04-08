import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../Services/User/user.service';
import { UserInfo } from 'os';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isUser: boolean = false;
  userService = inject(UserService);
  router = inject( Router)

  ngOnInit() {
    if (!this.userService.currentUserSignal()) {
      this.isUser = true;
    } if (this.userService.currentUserSignal() === null) {
      this.isUser = false;
    }

    // Whenever the subject is going to emit a new velue the subscriber will notified about it
    // The userSub/subscribe method return Subscribtion and it is good practise if we unsubscribe
    // this.userSub = this.authService.userSub.subscribe((user: User) => {
    //   this.isUser = user ? true : false;
    // });
  }

  logout() {
    this.userService.logout().subscribe(() => {
     
      // this.userService.currentUserSignal() === null
      this.router.navigate(['/home']);
    })
  }

  // ngOnDestroy() {
  //   this.userSub.unsubscribe();
  // }
}
