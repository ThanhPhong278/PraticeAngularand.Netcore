import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  constructor(private actorService: ActorsService) { }

  actors: actorDTO[];
  columnsToDisplay = ['name','dateOfBirth','pictures', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.actorService.get(this.currentPage, this.pageSize).subscribe((reponse: HttpResponse<actorDTO[]>) =>{
      this.actors = reponse.body;
      this.totalAmountOfRecords = reponse.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  delete(id: number){
    this.actorService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
