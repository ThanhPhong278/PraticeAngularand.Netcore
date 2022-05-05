import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUpercase } from 'src/app/validators/firstLetterUppercase';
import { genreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-create-genres',
  templateUrl: './create-genres.component.html',
  styleUrls: ['./create-genres.component.css']
})
export class CreateGenresComponent implements OnInit {

  constructor(private route: Router) { }
  ngOnInit(): void {
   
  }

  saveChanges(genreCreationDTO: genreCreationDTO){
    console.log(genreCreationDTO)
    this.route.navigate(['/genres']);
  }

}
