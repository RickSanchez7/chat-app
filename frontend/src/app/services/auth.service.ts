import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  id: string;
  username: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'http://localhost:3000';
  signedIn$ = new BehaviorSubject<null | boolean>(null);

  constructor(private http: HttpClient) {}

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap((a) => {
          console.log('a', a);

          this.signedIn$.next(true);
        })
      );
  }
}
