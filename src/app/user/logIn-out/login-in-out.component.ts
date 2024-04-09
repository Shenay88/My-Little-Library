import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from '../../Services/User/user.service';


import { LoaderComponent } from '../../utility/loader/loader.component';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';


@Component({
  selector: 'login-in-out',
  standalone: true,
  imports: [FormsModule, LoaderComponent, SnackbarComponent],
  templateUrl: './login-in-out.component.html',
  styleUrl: './login-in-out.component.css',
})

/* EXPLANATION

 * 1. console.log(form) {[control->Object(email, password),dirty,disabled,enabled,errors,formDirective,invalid,path]}
 * 2. console.log(form.value) {email: 'shani@abv.bg', password: '12345678'}
 * 3. 
 */
export class LoginInOutComponent {
  router: Router = inject(Router);
  userService: UserService = inject(UserService);

  isLoginForm: boolean = true;
  isLoading = false;

  errorMessage: string | null = null;

  firebaseAut = inject(Auth);

  constructor() {}

  onSwitch() {
    this.isLoginForm = !this.isLoginForm;
  }

  onSubmitUser(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;

    if (this.isLoginForm) {
      this.isLoading = true;
      this.userService.signIn(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {

          this.errorMessage = err.code;
         
          this.isLoading = false

          setTimeout(() => {
            this.errorMessage = null;
          }, 3000)
         
          form.reset()
        },
      });
    } else {
      const username: string = form.value.username;
      this.userService.signUp(email, username, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.errorMessage = err.code;

          setTimeout(() => {
            this.errorMessage = null;
          }, 3000)
        },
      });
    }
  }

}
