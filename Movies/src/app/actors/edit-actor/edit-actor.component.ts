import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { actorCreateDTO, actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private actorsService: ActorsService,
    private route: Router,
    private toastr: ToastrService) { }

  model: actorDTO;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.actorsService.getById(params.id).subscribe(actor => this.model = actor)
    });
  }
  saveChanges(actorCreateDTO: actorCreateDTO){
    console.log(actorCreateDTO);
    this.actorsService.edit(this.model.id, actorCreateDTO).subscribe(() => {
      this.toastr.success("Update actor successfully","Success")
      this.route.navigate(['/actors']);
    });
  }
}
