import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  // authService: UserService = inject(UserService);
  // isUser: boolean = false;
  // private userSub: Subscription = new Subscription;

  // ngOnInit() {
  //   // Whenever the subject is going to emit a new velue the subscriber will notified about it
  //   // The subscribe method return Subscribtion and it is good practise if we unsubscribe
  //   this.userSub = this.authService.userSub.subscribe((user: User) => {
  //     this.isUser = user ? true : false;
  //   });
  // }

  // ngOnDestroy() {
  //   this.userSub.unsubscribe();
  // }
}
