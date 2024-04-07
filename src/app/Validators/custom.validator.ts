import { FormControl, ValidationErrors } from '@angular/forms';

// Create custom Validator method
export class CustomValidators {
  static noSpace(control: FormControl): ValidationErrors | null {
    const startsWithWhitespace = /^\s/.test(control.value);
    const endsWithWhitespace = /\s$/.test(control.value);

    if (startsWithWhitespace || endsWithWhitespace) {
      return { whitespace: true };
    }
    return null;
  }

  static validURL(control: FormControl): ValidationErrors | null {
    const string = control.value;
    const isTrue = /https:\/\//.test(string);

    if (!isTrue) {
      return { validURL: false };
    }
    return null;
  }
}
