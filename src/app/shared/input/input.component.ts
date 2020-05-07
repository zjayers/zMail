import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor() {}

  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;

  ngOnInit(): void {}

  checkForErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
