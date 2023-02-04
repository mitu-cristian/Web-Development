import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private auth: AuthService) { }

  onSubmit(form: NgForm) {
    this.auth.signup(form.value.email, form.value.password);

  }

}
