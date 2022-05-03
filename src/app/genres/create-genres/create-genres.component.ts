import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-genres',
  templateUrl: './create-genres.component.html',
  styleUrls: ['./create-genres.component.css']
})
export class CreateGenresComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  saveChanges(){
    this.route.navigate(['/genres']);
  }
}
