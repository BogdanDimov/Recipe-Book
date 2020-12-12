import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponseData {
  idToken: string;          // A Firebase Auth ID token for the newly created user.
  email: string;            // The email for the newly created user.
  refreshToken: string;     // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;        // The number of seconds in which the ID token expires.
  localId: string;          // The uid of the newly created user.
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3CCggND6SB7itOrvrZWQeabxtGV9MJbQ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
