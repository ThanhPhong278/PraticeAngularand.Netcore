import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: movieTheatersDTO = {name: 'phongvo', latitude:10.845422562216525, longitude:106.6623330116272};
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {

    })
  }

  saveChanges(movieTheater: movieTheatersCreationDTO){

  }
}
