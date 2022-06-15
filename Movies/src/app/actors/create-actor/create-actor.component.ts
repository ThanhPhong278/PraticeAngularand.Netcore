import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { actorCreateDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  constructor(private actorsService: ActorsService, private router: Router) { }

  errors: string[] = [];
  ngOnInit(): void {
  }
  saveChanges(actorCreateDTO: actorCreateDTO){
    this.actorsService.create(actorCreateDTO).subscribe(()=>{
      this.router.navigate(['/actors']);
    },error => this.errors = parseWebAPIErrors(error));
  }
}
