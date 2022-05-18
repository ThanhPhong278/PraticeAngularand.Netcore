import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieTheatersCreationDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: movieTheatersCreationDTO = {name: 'phongvo'};
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {

    })
  }

  saveChanges(movieTheater: movieTheatersCreationDTO){

  }
}
