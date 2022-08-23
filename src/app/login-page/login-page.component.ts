import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {gender} from "../models/Constant";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  registerForm: FormGroup;
  connectForm: FormGroup;
  submitted = false;

  genderList: string[] = gender

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      phoneNb: ['', [ Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(5)]],
      gender: ['', [Validators.required]],
      remember: ['', []],
    });

    this.connectForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
      remember: ['', []]
    });
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }

  maxDate: Date;
  isSignIn: boolean = true;
  hide : boolean = true;
  remember : boolean = false;
  editMode: boolean = false;


  signInToUp(){
    this.isSignIn = !this.isSignIn;
  }

  signIn(){
    console.log(this.connectForm.value)
  }

  signUp(){
    console.log(this.registerForm.value)
  }
}
