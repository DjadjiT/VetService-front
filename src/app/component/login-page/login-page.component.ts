import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  registerForm: FormGroup;
  connectForm: FormGroup;
  submitted = false;
  isSignIn: boolean = true;
  hide : boolean = true;
  remember : boolean = false;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      phoneNb: ['', [ Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password : ['', [Validators.required, Validators.minLength(5)]],
      remember: ['', []],
    });

    this.connectForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
      remember: ['', []]
    });
  }

  ngOnInit(): void {
  }

  signInToUp(){
    this.isSignIn = !this.isSignIn;
  }

  signIn(){
    this.authService.login(this.connectForm.value)
  }

  signUp(){
    this.authService.registerUser(this.registerForm.value)
  }
}
