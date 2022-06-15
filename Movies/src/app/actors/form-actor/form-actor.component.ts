import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUpercase } from 'src/app/validators/firstLetterUppercase';
import { actorCreateDTO, actorDTO } from '../actors.model';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  @Input() model: actorDTO;
  @Output() onSaveChanges = new EventEmitter<actorCreateDTO>();
  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['',{
          validators: [Validators.required,firstLetterUpercase(), Validators.maxLength(120)]
        }],
      dateOfBirth: '',
      picture: '',
      biography: '',
    });
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  onImageSelected(image){
    this.form.get('picture').setValue(image);
  }

  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }

  changeMarkdown(content){
    this.form.get('biography').setValue(content);
  }

  getErrorMessageFieldName(){
    const field = this.form.get('name');

    if (field.hasError('required')){
      return 'The name field is required';
    }

    if (field.hasError('minlength')){
      return 'The maximum length is 120'
    }

    if (field.hasError('firstLetterUpercase')){
      return field.getError('firstLetterUpercase').message;
    }
    return'';
  }
}
