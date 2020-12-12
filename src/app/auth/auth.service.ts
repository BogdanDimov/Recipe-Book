import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;          // A Firebase Auth ID token for the newly created user.
  email: string;            // The email for the newly created user.
  refreshToken: string;     // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;        // The number of seconds in which the ID token expires.
  localId: string;          // The uid of the newly created user.
  registered?: boolean;     // Whether the email is for an existing account.
}

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3CCggND6SB7itOrvrZWQeabxtGV9MJbQ',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(res => this.handleAuthentication(res)));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3CCggND6SB7itOrvrZWQeabxtGV9MJbQ',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(res => this.handleAuthentication(res)));
  }

  private handleAuthentication(authRes: AuthResponseData) {
    const expDate = new Date(new Date().getTime() + +authRes.expiresIn * 1000);
    const user = new User(authRes.email, authRes.localId, authRes.idToken, expDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error && errorRes.error.error) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email exists already!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Password not correct!';
          break;
        case 'INVALID_EMAIL':
          errorMessage = 'Email is not valid!';
          break;
      }
    }
    return throwError(errorMessage);
  }
}
