import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.moviesInTheaters = [{
      title: 'Spider Man Amazing 2',
      releaseDate: new Date(),
      price: 75000,
      poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg'
    },
    {
      title: 'Me Before You',
      releaseDate: new Date('2021-08-27'),
      price: 85000,
      poster: 'https://m.media-amazon.com/images/M/MV5BMTQ2NjE4NDE2NV5BMl5BanBnXkFtZTgwOTcwNDE5NzE@._V1_.jpg'
    }];

    this.moviesFutureReleases = [];
  }
  moviesInTheaters;
  moviesFutureReleases;
}
