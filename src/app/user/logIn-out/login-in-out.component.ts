import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';
import { LoaderComponent } from '../../utility/loader/loader.component';
import { SnackbarComponent } from '../../utility/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../Model/Auth';

@Component({
  selector: 'login-in-out',
  standalone: true,
  imports: [FormsModule, LoaderComponent, SnackbarComponent],
  templateUrl: './login-in-out.component.html',
  styleUrl: './login-in-out.component.css',
})
export class LoginInOutComponent {
  router: Router = inject(Router);
  userService: UserService = inject(UserService);

  // authObservable: Observable<AuthResponse>;

  isLogin: boolean = true;
  isLoading = false;

  errMessage: string | null = null;

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmitUser(form: NgForm) {
    // console.log(form) {[control->Object(email, password),dirty,disabled,enabled,errors,formDirective,invalid,path]}
    // console.log(form.value) {email: 'shani@abv.bg', password: '12345678'}

    const email: string = form.value.email;
    const password: string = form.value.password;

    // if (this.isLogin) {
    //   this.isLoading = true;
    //   this.authObservable = this.userService.signIn(email, password);
    // } else {
    //   this.isLoading = true;
    //   this.authObservable = this.userService.signUp(email, password);
    // }

    // this.authObservable.subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/home'])
    //   },
    //   error: (errorFromUserService) => {
    //     this.isLoading = false;
    //     this.errMessage = errorFromUserService;
    //     setTimeout(() => {
    //       this.errMessage = null;
    //     }, 3000);
    //   },
    // });

    form.reset();
  }
}
