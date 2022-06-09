import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { firstLetterUpercase } from 'src/app/validators/firstLetterUppercase';
import { genreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genres',
  templateUrl: './create-genres.component.html',
  styleUrls: ['./create-genres.component.css']
})
export class CreateGenresComponent implements OnInit {

  errors: string[] = [];
  constructor(private route: Router, private genresService: GenresService ) { }
  ngOnInit(): void {
   
  }

  saveChanges(genreCreationDTO: genreCreationDTO){
    this.genresService.create(genreCreationDTO).subscribe(()=> {      
      this.route.navigate(['/genres']);
    }, error => this.errors = parseWebAPIErrors(error));
    
  }

}
