import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { movieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private movietheaterService: MovieTheatersService,
    private toastr: ToastrService,
    private route: Router) { }

    errors: string[] = [];

  ngOnInit(): void {
  }

  saveChanges(movieTheater: movieTheatersCreationDTO){
    console.log(movieTheater);
    this.movietheaterService.create(movieTheater).subscribe(() =>{
      this.route.navigate(['movietheaters']);
      this.toastr.success("Create movie theater successfully","Success");
    }, error => this.errors = parseWebAPIErrors(error));
  }
}
