import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: any;

  constructor(
    public service: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
    this.id = this.route.snapshot.params['id'];
    this.service.getMovieById(this.id).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  previousPage() {
    this.location.back();
  }
}
