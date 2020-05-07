import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ],
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  checkForErrors() {
    return (
      this.authForm.errors
    );
  }

  onFormSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.auth.signIn(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        console.log(err);
        // Handle Errors
        if (!err.status) {
          this.authForm.setErrors({ noDatabaseConnection: true });
        } else if (err.status === 401) {
          this.authForm.setErrors({ invalidCredentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
