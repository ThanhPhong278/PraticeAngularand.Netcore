import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { actorCreateDTO } from '../actors.model';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: actorCreateDTO = {name: 'Thanh Phong', dateOfBirth: new Date()}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      // alert(params.id);
    })
  }
  saveChanges(actorCreateDTO: actorCreateDTO){
    console.log(actorCreateDTO);
  }
}
