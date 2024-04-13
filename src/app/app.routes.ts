import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { MyBooksComponent } from './book/my-books/my-books.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { LoginInOutComponent } from './user/logIn-out/login-in-out.component';
import { authGuard, loggedGuard } from './auth.guard';
import { SortBooksComponent } from './home/sort-books/sort-books.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', title: 'Home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'add-book', title: 'New Book', component: AddBookComponent, canActivate:[authGuard] },
  { path: 'my-books', title: 'My Books', component: MyBooksComponent, canActivate:[authGuard] },
  { path: 'books/book-details/:bookId', component: BookDetailsComponent, canActivate:[authGuard] },
  { path: 'books/book/:id', component: EditBookComponent, canActivate:[authGuard] },
  { path: 'sort-books', component: SortBooksComponent },
  { path: 'login', component: LoginInOutComponent, canActivate:[loggedGuard]},
  { path: '**', title: 'Page Not Found', component: NotFoundComponent },
];
