import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreateDTO } from '../actors.model';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  @Input() model: actorCreateDTO;
  @Output() onSaveChanges = new EventEmitter<actorCreateDTO>();
  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['',{
          validators: [Validators.required,]
        }],
      dateOfBirth: '',
    });
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  
  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }
}
