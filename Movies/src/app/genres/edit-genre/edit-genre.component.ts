import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
     private genreService: GenresService,
     private router: Router,
     private toastr: ToastrService) { }

  model: genreDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.genreService.getById(params.id).subscribe(genre => {
        this.model=genre;
      })
    });
  }

  saveChanges(genreCreationDTO: genreCreationDTO){
    this.genreService.edit(this.model.id, genreCreationDTO).subscribe(() =>{
      this.toastr.success("Update genre successfully","Success")
      this.router.navigate(["/genres"]);      
    });
  }

}
