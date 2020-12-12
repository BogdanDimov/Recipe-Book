import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  loginActive = true;
  loading = false;

  constructor(private authService: AuthService) { }

  onSwitchMode(): void {
    this.loginActive = !this.loginActive;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.loading = true;

    if (this.loginActive) {

    } else {
      this.authService.signUp(email, password)
        .subscribe(
          response => {
            console.log(response);
            this.loading = false;
          },
          error => {
            console.log(error);
            this.loading = false;
          }
        );
    }

    form.reset();
  }
}
