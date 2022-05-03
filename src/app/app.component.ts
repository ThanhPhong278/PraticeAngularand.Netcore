import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  title = 'Any value';
  movies;
  display = true;

  dublicateNumber(n: number): number{
      return n*2;
  }
  handleRating(rate: number){
    alert(`The user selected ${rate}`);
  }
}
