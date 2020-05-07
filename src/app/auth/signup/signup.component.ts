import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUser } from '../validators/unique-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUser: UniqueUser,
    private auth: AuthService,
    private router: Router
  ) {}

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUser.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  ngOnInit(): void {}

  checkForErrors() {
    return (
      this.authForm.get('password').touched &&
      this.authForm.get('passwordConfirmation').touched &&
      this.authForm.errors
    );
  }

  onFormSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.auth.signUp(this.authForm.value).subscribe({
      next: (response) => {
        // Handle Successful Request
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        // Handle Errors
        if (!err.status) {
          this.authForm.setErrors({ noDatabaseConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
