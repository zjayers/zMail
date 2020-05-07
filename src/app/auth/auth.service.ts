import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface ZMailResponse {
  available: boolean;
}

interface UserCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  data: {
    user: {
      name: string;
    };
  };
}

interface SignedInResponse {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ayers-zmail.herokuapp.com/api/v1/auth';
  signedIn$ = new BehaviorSubject(false); // Allow Other components to subscribe to data

  // USERNAME VALIDATION
  checkIfUsernameAvailable(username: string) {
    return this.http.post<ZMailResponse>(this.baseUrl + '/username', {
      username,
    });
  }

  // SIGN UP
  signUp(credentials: UserCredentials) {
    const { username, password, passwordConfirmation } = credentials;
    return this.http
      .post<SignUpResponse>(this.baseUrl + '/signup', {
        name: username,
        password,
        passwordConfirm: passwordConfirmation,
      })
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  // SIGN IN
  signIn(credentials: UserCredentials) {
    const { username, password } = credentials;
    return this.http
      .post<SignUpResponse>(this.baseUrl + '/signin', {
        name: username,
        password,
      })
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  // SIGN OUT
  signOut() {
    return this.http
      .get<SignedInResponse>(this.baseUrl + '/signout')
      .pipe(
        tap(() => {
          this.signedIn$.next(false);
        })
      );
  }

  // Check Authorization
  checkAuth() {
    return this.http
      .get<SignedInResponse>(this.baseUrl + '/isLoggedIn')
      .pipe(
        tap((response) => {
          this.signedIn$.next(response.loggedIn);
        })
      );
  }
}
