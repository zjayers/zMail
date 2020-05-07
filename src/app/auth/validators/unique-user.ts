import { Injectable } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';
import { AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUser implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (control: FormControl): Observable<ValidationErrors> => {
    const { value } = control;

    return this.auth.checkIfUsernameAvailable(value).pipe(
      map((val) => {
        if (val.available) {
          return null;
        }
      }),
      catchError((err) => {
        console.log(err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noDatabaseConnection: true });
        }
      })
    );
  };
}
