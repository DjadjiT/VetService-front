import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {SPECIALITYLIST, paymentMethod} from '../../models/Constant'
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-vet-signup-page',
  templateUrl: './vet-signup-page.component.html',
  styleUrls: ['./vet-signup-page.component.css']
})
export class VetSignupPageComponent implements OnInit {

  registerForm: FormGroup;

  paymenentMethodList: string[] = paymentMethod

  maxDate: Date;
  hide : boolean = true;

  speciality : string[] = SPECIALITYLIST;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      phoneNb: ['', [ Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate : ['', [Validators.required]],
      speciality : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(5)]],
      institutionName: ['', [Validators.required]],
      street : ['', [Validators.required]],
      postalCode : ['', [Validators.required]],
      informations : [''],
      city : ['', [Validators.required]],
      country : [{value:"France", disabled: true}],
      rpps: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      selectedPayments: new FormArray([], Validators.required),
      appointmentArray: new FormArray([]),
    });
    this.maxDate = new Date();
  }


  ngOnInit(): void {
  }

  onCheckboxChange(event: any) {
    const selectedPayments = (this.registerForm.controls['selectedPayments'] as FormArray);
    if (event.target.checked) {
      selectedPayments.push(new FormControl(event.target.value));
    } else {
      const index = selectedPayments.controls
        .findIndex(x => x.value === event.target.value);
      selectedPayments.removeAt(index);
    }
  }

  removeSelectedAppointment(idx: number){
    this.appointmentArray.removeAt(idx);
  }

  addSelectedAppointment(){
    let app = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.appointmentArray.push(app)
  }

  getPostalCodeLength(){
    return this.registerForm.get("postalCode")?.value.length;
  }

  async signUpVet() {
    const selectedPayments = (this.registerForm.controls['selectedPayments'] as FormArray);

    let appList = []
    appList.push("Consultation")
    appList = appList.concat(this.getSelectedAppointment())

    let body: any = {
      firstName: this.registerForm.get("firstName")?.value,
      lastName: this.registerForm.get("lastName")?.value,
      email: this.registerForm.get("email")?.value,
      birthdate: this.registerForm.get("birthDate")?.value,
      password: this.registerForm.get("password")?.value,
      phoneNb: this.registerForm.get("phoneNb")?.value,
      speciality: this.registerForm.get("speciality")?.value,
      institutionName: this.registerForm.get("institutionName")?.value,
      informations: this.registerForm.get("informations")?.value,
      street: this.registerForm.get("street")?.value,
      postalCode: this.registerForm.get("postalCode")?.value,
      city: this.registerForm.get("city")?.value,
      country: this.registerForm.get("country")?.value,
      rpps: this.registerForm.get("rpps")?.value,
      appointmentType: appList,
      paymentMethod: selectedPayments.value,
    }

    await this.authService.registerVet(body)
  }

  getSelectedAppointment(): string[]{
    let res : string[] = []

    for(let i =0; i < this.appointmentArray.value.length ; i++){
      res.push(this.appointmentArray.value[i].name)
    }
    return res
  }

  get appointmentArray(){
    return this.registerForm.controls["appointmentArray"] as FormArray;
  }

}
