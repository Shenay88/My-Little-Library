import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../../Model/Auth';
import { BehaviorSubject, catchError, tap, throwError, timestamp } from 'rxjs';
import { User } from '../../Model/User';

@Injectable({
  providedIn: 'root',
})

/* EXPLANATION
  * 1. userSub = new BehaviorSubject<User>() -  It will emit User object and will contein JWT. If there is no JWT or the expire date finished it will return null
  * 2. Subjects are multicast - can emit same data to multiple subscribers. BehaviorSubject is working as Subjects but the one advantage is that it is giving us the previously emitted data
  * 3. With the "tap" operator/function we can tap into the response. We can do something with the response without modifying it.

*/ 
export class UserService {
  
  http: HttpClient = inject(HttpClient);
  
  // userSub = new BehaviorSubject<User>(null);

  constructor() {}
  
  signUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6Qkvor66wxiR2W86ESpgwfiARHLLOSB8',
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.createUser(res);
        })
      );
  }

  signIn(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>( //return Observable - handling asynchronous data streams.
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6Qkvor66wxiR2W86ESpgwfiARHLLOSB8',
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.createUser(res);
        })
      );
  }

  private createUser(res:any) {
    /* Explanation
     * 1. We are calling the constructor of the User class and passing the values
     * 2. Before creating the user we need to convert the time. The expiresIn property is stroring the value in seconds but the User class is execting a value of type Date.
     * 3. const expiresInTimestamp = new Date().getTime() - First we take the timestamp of the current time
     * 4. We multiply by 1000 to convert seconds to milliseconds
     * 5. expiresInTimestamp - it returns us the timestamp of the expire time
     * 6. expireInDate - it returns us the expire Date
     * 7. After creating the new User we want to emit this object using user = new Subject<User>();
     * 8. After it will be accessed from anywhere in the application
     */

    const expiresInTimestamp =
      new Date().getTime() + Number(res.expiresIn) * 1000;
    const expireInDate = new Date(expiresInTimestamp);
    const user = new User(res.email, res.localId, res.idToken, expireInDate);
    // this.userSub.next(user);
  }

  private handleError(err: any) {
    /* Explanation
     * 1. return - because we want to retun observable.
     * 2. When used in combination with the catchError operator, throwError allows you to handle errors within an observable stream and replace the errored observable with a new observable that emits a predefined error.
     */

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
