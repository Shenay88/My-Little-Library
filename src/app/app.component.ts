import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'My-Little-Library';

  userService = inject(UserService);
  user!: string;

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user) {
        this.userService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.user = user.displayName!
       
      } else {
        this.userService.currentUserSignal.set(null);
      }
    });
   

  }
}
