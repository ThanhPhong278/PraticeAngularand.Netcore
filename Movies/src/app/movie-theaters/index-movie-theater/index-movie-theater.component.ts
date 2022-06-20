import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { movieTheatersDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-index-movie-theater',
  templateUrl: './index-movie-theater.component.html',
  styleUrls: ['./index-movie-theater.component.css']
})
export class IndexMovieTheaterComponent implements OnInit {

  constructor(private movietheaterService: MovieTheatersService,
    private toastr: ToastrService) { }

  movieTheater: movieTheatersDTO[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.movietheaterService.get(this.currentPage, this.pageSize).subscribe(respone =>{
      this.movieTheater = respone.body;
      this.totalAmountOfRecords = respone.headers.get("totalAmountOfRecords");
    })
  }

  delete(id: number){
    this.movietheaterService.delete(id).subscribe(() =>{
      this.loadData();
      this.toastr.success("Delete movie theater successfully","Success")
    })
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

}
