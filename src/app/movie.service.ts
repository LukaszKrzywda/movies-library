import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';

export class Movie {
  Id: number;
  Title: string;
  Director: string;
  Plot: string;
  Date: string;
  Mark: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  formData: Movie;
  readonly url = 'https://localhost:44374/api';
  list: Movie[];
  constructor(private http: HttpClient, private router: Router) {}

  refreshList() {
    this.http
      .get(this.url + '/Movie')
      .toPromise()
      .then((res) => (this.list = res as Movie[]));
  }

  postMovie(formData: Movie) {
    return this.http.post(this.url + '/Movie', formData);
  }

  deleteMovie(id) {
    return this.http.delete(this.url + '/Movie/' + id);
  }

  getMovieById(id) {
    return this.http.get(this.url + '/Movie/' + id);
  }
}
