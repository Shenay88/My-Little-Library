# MyLittleLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.


My Little Library
Welcome to My Little Library! This web application is designed to help users manage their personal book collections and discover new reads. Built with Angular 17 and Firebase for backend services, this platform offers features for authentication, database management, and interactive book browsing.

Features

Authentication
Users can sign up for an account or log in using their email and password.
Default credentials for testing:
Email: peter@abv.bg
Password: 12345678

Book Management

Add Book: Users can add new books to their collection by providing details like title, type, author name, etc.
My Books: Users can view and manage their added books, including editing and deleting them.
Book Details: Users can view detailed information about a specific book, including options to like or dislike it.
Sorting: Books can be sorted by various criteria such as newness, popularity, and alphabetically (both ascending and descending order).

Access Control

Likes: Only logged-in users can like or dislike books.
Editing and Deleting: Owners of the books have exclusive rights to edit and delete them, while other users can only view them.

Search

Users can search for books based on title, type, or author name.

Routes
/home: Landing page displaying featured books and options to navigate.
/add-book: Page to add a new book to the collection.
/my-books: Display all books added by the logged-in user.
/books/book/:id: Edit page for a specific book identified by its ID.
/books/book-details/:bookId: Detailed view of a specific book.
/sort-books: Page for sorting and filtering books.
/login: Login and authentication page.
**: Page Not Found - Redirects users to this page for any invalid routes.

Deployment

This project is deployed on Firebase and can be accessed at https://my-little-library-799e3.web.app/home , https://shenay88.github.io/My-Little-Library/home

Repository
The source code for this project can be found on GitHub: https://github.com/Shenay88/My-Little-Library.git


