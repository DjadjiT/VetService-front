import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HealthRecord} from "../models/healthRecord";
import {Vaccin} from "../models/vaccin";
import {Note} from "../models/note";
import {MatDialog} from "@angular/material/dialog";
import {DialogRecordComponent} from "../dialog-new-record/dialog-record.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {gender, SPECIALITYLIST} from "../models/Constant";
import {MockService} from "../services/MockService";
import {Schedule} from "../models/Schedule";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  speciality : string[] = SPECIALITYLIST;
  form: FormGroup;
  maxDate: Date;
  submitted = false;
  hide : boolean = true;
  editMode : boolean = true;

  genderList: string[] = gender

  profile : User;
  healthRecord: HealthRecord[]

  schedule: Schedule

  time = {hour: 13, minute: 30};

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.profile = MockService.mockVet()

    this.healthRecord = [
      MockService.mockHealRecord(),
      new HealthRecord(
        "Chat", "Djadja", "Staffie", "Persan", false, new Date(2020, 3, 12), 1
      ),
    ];

    this.healthRecord[0].notes = [
      MockService.mockNote(),
      new Note("Prend de l'embonpoint",
        new Date(2020, 4, 12))
    ];

    this.healthRecord[0].vaccins = [
      MockService.mockVaccin(),
      new Vaccin("Hepatite",
        new Date(2020, 9, 12))
    ];

    if (this.profile.role == "client"){
      this.form = this.formBuilder.group({
        phoneNb: [this.profile.phoneNb, [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]],
        email: [this.profile.email, [Validators.required, Validators.email]],
        firstName: [this.profile.firstName, [Validators.required]],
        lastName: [this.profile.lastName, [Validators.required]],
        birthDate: [this.profile.birthDate, [Validators.required]],
        password: [this.profile.password, [Validators.required, Validators.minLength(5)]],
        gender: [this.profile.gender, [Validators.required]],
      });
    }
    else{
      this.form = this.formBuilder.group({
        phoneNb: [this.profile.phoneNb, [ Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]],
        email : [this.profile.email, [Validators.required, Validators.email]],
        firstName: [this.profile.firstName, [Validators.required]],
        lastName: [this.profile.lastName, [Validators.required]],
        birthDate : [this.profile.birthDate, [Validators.required]],
        password : [this.profile.password, [Validators.required, Validators.minLength(5)]],
        name: [this.profile.institutionName, [Validators.required]],
        address : [this.profile.street, [Validators.required]],
        postalCode : [this.profile.postalCode, [Validators.required]],
        city : [this.profile.city, [Validators.required]],
        speciality : [this.profile.speciality, [Validators.required]],
        rpps: [this.profile.rpps, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        notes: [this.profile.informations.informations, []]
      });
    }
    this.maxDate = new Date();

    console.log(this.healthRecord);

    this.schedule = new Schedule(8,12,14,18,
      [
        true,
        true,
        true,
        true,
        true,
        false,
        false,
      ])
  }


  ngOnInit(): void {
    this.maxDate = new Date();
  }

  getBirthDateLocale(){
    return this.profile.birthDate.toLocaleDateString();
  }

  canSave(){
    console.log(this.form)
    this.openSnackBar('Votre profil a été modifié avec succès !');
  }

  deleteRecord(id: number){
    console.log(this.healthRecord[id])
  }

  editRecord(id: number){
    console.log(this.healthRecord[id])
  }

  newRecord(){
    this.dialog.open(DialogRecordComponent, {
      width: '700px',
      height: '700px',
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Fermer");
  }
  getPostalCodeLength(){
    return this.form.get("postalCode")?.value.length;
  }
}
