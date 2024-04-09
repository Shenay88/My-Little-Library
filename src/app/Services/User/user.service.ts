import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { UserInterfase } from '../../Model/Auth';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
  * 3. Firebase does not return Observable, it returns for us Promises. We return it in an Observable
  * 4. After creating the user we need to update and add username because firebase provide only email and password. That's why we use updateProfile()
  * 5. response.user - created user and we ad {displayname: username}. It return Promise void
  ! handleError()
  * 1. return - because we want to retun observable.
  * 2. When used in combination with the catchError operator, throwError allows you to handle errors within an observable stream and replace the errored observable with a new observable that emits a predefined error.
  * 3. throwError() - return an Observable
*/

  http: HttpClient = inject(HttpClient);
  firebaseAut = inject(Auth);
  user$ = user(this.firebaseAut);
  currentUserSignal = signal<UserInterfase | null | undefined>(undefined);

  signUp(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAut,
      email,
      password
    ).then(response => updateProfile(response.user, {displayName: username}));
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

}
