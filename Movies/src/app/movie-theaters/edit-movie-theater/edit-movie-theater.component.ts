import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private movietheaterService: MovieTheatersService,
    private route: Router,
    private toastr: ToastrService) { }

  model: movieTheatersDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      this.movietheaterService.getById(params.id).subscribe(movieTheater => {
        this.model = movieTheater;
      });
    });
  }

  saveChanges(movieTheater: movieTheatersCreationDTO){
    this.movietheaterService.edit(this.model.id, movieTheater).subscribe(() =>{
      this.toastr.success("Update movie theater successfully","Success")
      this.route.navigate(["/movietheaters"]);      
    });
  } 
}
