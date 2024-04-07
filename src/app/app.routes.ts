import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { MyBooksComponent } from './book/my-books/my-books.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { LoginInOutComponent } from './user/logIn-out/login-in-out.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', title:'Home', pathMatch: 'full'},
    {path: 'home', title: 'Home', component: HomeComponent},
    {path: 'add-book', title: 'New Book', component: AddBookComponent},
    {path: 'my-books', title: 'My Books', component: MyBooksComponent},
    {path: 'books/book-details/:id', component: BookDetailsComponent},
    {path: 'books/book/:id', component: EditBookComponent},


    {path: 'auth', component: LoginInOutComponent},
    {path: '**', title: 'Page Not Found', component: NotFoundComponent}
]; 
