import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres: genreDTO[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;
  constructor(private genresSerrvice: GenresService, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.loadGenres();
  }

  loadGenres() {
    this.genresSerrvice.getAll(this.currentPage, this.pageSize).subscribe(respone =>{
      this.genres = respone.body;
      this.totalAmountOfRecords = respone.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadGenres();
  }

  delete(id: number) {
    this.genresSerrvice.delete(id).subscribe(() =>{
      this.toastr.success("Delete genre successfully","Success");
      this.loadGenres();
    });
  }
}
