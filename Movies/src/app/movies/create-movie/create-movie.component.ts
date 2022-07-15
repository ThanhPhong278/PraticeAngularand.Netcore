import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { movieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private movieService: MoviesService, 
    private toastr: ToastrService,
    private router: Router) { }

  nonSelectedGenres: multipleSelectorModel[];
  nonSelectedMovieTheaters: multipleSelectorModel[];
  errors: string[] = [];
  ngOnInit(): void {
    this.movieService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre =>{
        return <multipleSelectorModel>{key: genre.id, value: genre.name}
      });
      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater =>{
        return <multipleSelectorModel>{key: movieTheater.id, value: movieTheater.name}
      });
    })
  }

  SaveChanges(movieCreationDTO: movieCreationDTO){
    console.log(movieCreationDTO);
    this.movieService.create(movieCreationDTO).subscribe(id =>{
      this.router.navigate(['/movie/' + id]);
      this.toastr.success("Create actor successfully","Success")
    },error => this.errors = parseWebAPIErrors(error));
  }
}
