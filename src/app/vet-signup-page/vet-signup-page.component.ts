import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {SPECIALITYLIST} from '../models/Constant'

@Component({
  selector: 'app-vet-signup-page',
  templateUrl: './vet-signup-page.component.html',
  styleUrls: ['./vet-signup-page.component.css']
})
export class VetSignupPageComponent implements OnInit {

  registerForm: FormGroup;

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
      name: ['', [Validators.required]],
      address : ['', [Validators.required]],
      postalCode : ['', [Validators.required]],
      city : ['', [Validators.required]],
      speciality : ['', [Validators.required]],
      rpps: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      notes: ['', []]
    });
    this.maxDate = new Date();
  }

  maxDate: Date;
  hide : boolean = true;

  speciality : string[] = SPECIALITYLIST;

  ngOnInit(): void {
  }

  getPostalCodeLength(){
    return this.registerForm.get("postalCode")?.value.length;
  }

  signUp(){
    console.log(this.registerForm.value)
  }

}
