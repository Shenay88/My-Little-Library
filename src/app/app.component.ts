import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './Services/User/user.service';
import { AuthResponse } from './Model/Auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'My-Little-Library';

  userService = inject(UserService);

 

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if(user) {
        this.userService.currentUserSignal.set({
          email: user.email!,
        })
      } else {
        this.userService.currentUserSignal.set(null)
      }
      console.log(this.userService.currentUserSignal())
    });

    
  }
}
