import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    })
  }

  onSubmit() {
    this.auth.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    this.loginForm.controls['email'].value = '';
    this.loginForm.controls['password'].value = '';
  }

}
