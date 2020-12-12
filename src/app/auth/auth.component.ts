import { AuthResponseData, AuthService } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  loginActive = true;
  loading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSwitchMode(): void {
    this.loginActive = !this.loginActive;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.loading = true;

    if (this.loginActive) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loading = false;
      }
    );

    form.reset();
  }
}
