import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: movieDTO = {
    title: 'Spider-Man',
    inTheaters: true,
    summary: "Whatever",
    releaseDate: new Date(),
    trailer: 'abcde',
    poster:'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg',
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
    })
  }

  saveChanges(movieCreationDTO: movieCreationDTO){

  }
}
