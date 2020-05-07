import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ZMailResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkIfUsernameAvailable(username: string) {
    return this.http.post<ZMailResponse>(
      'https://ayers-zmail.herokuapp.com/api/v1/auth/username',
      {
        username,
      }
    );
  }
}
