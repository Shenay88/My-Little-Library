import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Books } from '../../Model/Books';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { UserService } from '../User/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  /* EXPLANATION
  ! POST !
  * 1. If the books collection is not exist, the post request will create that collection for us. If it is already exists then will use it. The post request will take care of converting this JS object in the json data
  * 2. The post method is return Observable and if we don't have any subscriber, the observable will not emit data - it is not sending request to the server. That's why we need subscriber.
  * 3. Two request will be send - one of them is OPTIONS. This is default behavior of a browser. When the OPTION request returns a success message then only the browser will make another / actual post request to the server.
  * 4. We have {name: '-NuoRP5Io9LvVeNiuau4'} - book ID
 
  ! GET All BOOKS !
  * 1. Server returns response and this response is an object with property(key) and its value(an object with its own properties).
  *    We receive 
                {
                   key: {title: dsd, author: fsf...},
                   key: {title: dsd, author: fsf...}
                }
  * 2. Before to use it we need to transform it. First we need to convert it into array and in that array we will have objects. Each object will have our properties - bookTitle, authorName etc. Because "get" returns observable we can use rxjs to transform the data and also we will asign the ID (key) property. We can use it later.
  * 3. Map rxjs operator return an Observable.
  * 4. We return the whole func because we don't want to subscribe here, because we need all books in the Book lists

  ! CATCH ERRORS !
  * 1. errorSubject = new Subject<HttpErrorResponse>() - if there some errors we can use errorSubject to emitted this err. We can set subscribers in which component we needed. And these subscriber will receive this err object whenever some HTTP error will occur.
  * 2. errorSubject - milticast observable which means it can emit sama data to miltiple subscribers.
  * 3. We need to specify what type of data we will emit.
  * 4. catchError block you're passing the error downstream to the subscribers of the observable.
  * 5. throwError(() => err) ensures that the error is propagated downstream to any subscribers of the observable returned by createBook. This allows components or other services subscribing to createBook to handle the error appropriately.
  * 6. We need to use next() if we want to emit the data in this case error.

  ! userService: UserService = inject(UserService) !
  * 1. userService: UserService = inject(UserService) - we want to access the userSub subject. It will emit the user object once the user is logged or signed. We want to extract the access token that's why we need to subscribe to this user service in this book service.   
  * 2. Angular knows that we logged in but Firebase doesn't know. We need to tell Firebase that authenticated user is making the request. That's why we need to attach the access token of that user with the request.       
*/

  baseUrl: string =
    'https://my-little-library-799e3-default-rtdb.firebaseio.com';

  http: HttpClient = inject(HttpClient);

  errorSubject = new Subject<HttpErrorResponse>();

  constructor() {}

  createBook(book: Books): Observable<any> {
    return this.http
      .post<{ name: string }>(`${this.baseUrl}/books.json`, book)
      .pipe(
        catchError((err) => {
          this.errorSubject.next(err.error.message || 'An error occurred');
          return throwError(() => console.log(err));
        })
      );
  }

  deleteBook(bookId: string | undefined): Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${bookId}.json`);
  }

  getAllBooks() {
    return this.http
      .get<{ [key: string]: Books }>(
        'https://my-little-library-799e3-default-rtdb.firebaseio.com/books.json'
      )
      .pipe(
        map((response) => {
          let books: any[] = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              books.push({ ...response[key], id: key });
            }
          }
          return books;
        })
      );
  }

  getBookById(bookId: string): Observable<Books> {
    return this.http.get<Books>(`${this.baseUrl}/books/${bookId}.json`);
  }

  updateBook(bookId: string, book: Books): Observable<Books> {
    const url = `${this.baseUrl}/books/${bookId}.json`;

    return this.http.put<Books>(url, book).pipe(
      catchError((error) => {
        // Handle and forward the error
        return throwError(() => {
          console.log(error);
        });
      })
    );
  }
}
