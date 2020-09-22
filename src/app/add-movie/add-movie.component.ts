import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  constructor(public service: MovieService) {}

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.form.reset();
    this.service.formData = {
      Id: 0,
      Title: null,
      Director: null,
      Plot: '',
      Date: '',
      Mark: '',
    };
  }

  onSubmit(form: NgForm) {
    this.service.postMovie(form.value).subscribe(
      (res) => {
        this.resetForm(form);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
