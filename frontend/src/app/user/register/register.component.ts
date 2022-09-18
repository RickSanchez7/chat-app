import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  registerForm = new FormGroup({
    username: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password,
  });

  constructor(private authService: AuthService) {}

  register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';

    console.log(this.registerForm.value);

    this.authService.signup(this.registerForm.value).subscribe({
      next: (a) => {
        console.log('eyyy', a);
      },
    });
  }
}
