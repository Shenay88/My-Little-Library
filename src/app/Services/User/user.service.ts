import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { AuthResponse } from '../../Model/Auth';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /* EXPLANATION
  ! MAIN
  * 1. user(this.firebaseAut) - returns us all user data. It is from Firebase
  * 2. currentUserSignal - we create our signal because we don'want to use whole user.
  * 3.  Firebase does not return Observable, it returns for us Promises. We return it in an Observable
  ! handleError()
  * 1. return - because we want to retun observable.
  * 2. When used in combination with the catchError operator, throwError allows you to handle errors within an observable stream and replace the errored observable with a new observable that emits a predefined error.
  * 3. throwError() - return an Observable
*/

  http: HttpClient = inject(HttpClient);
  firebaseAut = inject(Auth);
  user$ = user(this.firebaseAut); 
  currentUserSignal = signal<AuthResponse | null | undefined>(undefined); 

  constructor() {}
  signUp(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAut,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  signIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAut,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAut);
    return from(promise);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An uknown error has occured!';
    let error = err.error.error;

    if (!err.error || !error) {
      return throwError(() => errorMessage);
    }

    if (error.message === 'EMAIL_EXISTS') {
      errorMessage = 'The email address is already in use by another account.';
    }

    if (error.message === 'OPERATION_NOT_ALLOWED') {
      errorMessage = 'Password sign-in is disabled for this project.';
    }

    if (error.message === 'EMAIL_NOT_FOUND') {
      errorMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
    }

    if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
      errorMessage = 'The password or email is invalid.';
    }

    if (error.message === 'USER_DISABLED') {
      errorMessage = 'The user account has been disabled by an administrator.';
    }

    return throwError(() => errorMessage);
  }
}
