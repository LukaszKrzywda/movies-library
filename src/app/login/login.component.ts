import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    public service: MovieService
  ) {}

  login(form: NgForm) {
    const credentials = {
      username: form.value.username,
      password: form.value.password,
    };

    this.http
      .post('https://localhost:44374/api/auth/login', credentials)
      .subscribe(
        (response) => {
          const token = (<any>response).token;
          localStorage.setItem('jwt', token);
          this.invalidLogin = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.invalidLogin = true;
        }
      );
  }
}
