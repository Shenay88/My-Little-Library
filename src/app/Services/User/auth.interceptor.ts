import { HttpInterceptorFn } from '@angular/common/http';

/* EXPLANATION
 * 1. We use functional interceptor HttpInterceptorFn instead of class based.
 * 2. It is function that take HTTP request and HTTP handler function as a parameter.
 * 3. Whenever we will use HTTP client it will use this interceptor.
 * 4. We create a clone of the request that is going to be send to the server.
 * 5. Then we can set some additional data. It will not replace the headers but it will add our additional data.
 * 6. Bearer: This is a keyword used to indicate the type of authentication being used. In token-based authentication, 'Bearer' is the standard keyword used to denote that the request is authenticated using a bearer token.
 * 7. the token: This part represents the actual authentication token. This is where you would replace 'the token' with the actual token value that you obtain during the authentication process.
 * 8. 'Authorization: Bearer the token' - it means that you need to replace 'the token' with the actual authentication token that you want to include in the Authorization header. You can change 'the token' to any value that represents your actual authentication token. Just make sure that it follows the format expected by the authentication mechanism.
 * 8. We pass in the next cloned data.
 */

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer the token'),
  });
  console.log(authReq)
  return next(req);
};
