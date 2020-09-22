import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tails',
  templateUrl: './tails.component.html',
  styleUrls: ['./tails.component.css'],
})
export class TailsComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  constructor(public service: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  restForm(form?: NgForm) {
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

  onDelete(id) {
    this.service.deleteMovie(id).subscribe(
      (res) => {
        this.service.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDetails(id) {
    this.router.navigate(['/details', id]);
  }
}
