import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuider: FormBuilder) { }

  form: FormGroup;
  genres = [{id: 1, name: 'Drama'},{id: 2, name: 'Action'}];
  
  movies = [
    {title: 'Amazing Spider Man', poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg'},
    {title: 'Me Before You', poster: 'https://m.media-amazon.com/images/M/MV5BMTQ2NjE4NDE2NV5BMl5BanBnXkFtZTgwOTcwNDE5NzE@._V1_.jpg'},
    
  ];
  originalMovies = this.movies;
  ngOnInit(): void {
    this.form = this.formBuider.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inThearter: false,
    });

    this.form.valueChanges
    .subscribe(values => {  
      this.movies = this.originalMovies;   
      this.filterMovies(values);
    });
  }

  filterMovies(values: any){
    if (values.title){
      this.movies = this.movies.filter(movie => movie.title.indexOf(values.title) !==-1);
    }
  }
  clearForm(){
    this.form.reset();
  }

}
