import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredentials } from '../security.models';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup
  @Input()
  action: string = 'Register';

  @Output()
  onSubmit = new EventEmitter<userCredentials>();
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  }

  getEmailErrorMessage(){
    var field = this.form.get('email');
    if (field.hasError('required')){
      return "The email field is required";
    }

    if (field.hasError('email')){
      return "The email is invalid";
    }

    return '';
  }  

}
