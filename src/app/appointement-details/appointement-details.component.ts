import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointement} from "../models/appointement";
import {DateService} from "../services/DateService";
import {GoogleMapService} from "../services/GoogleMapService";
import {Note} from "../models/note";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VaccinService} from "../services/VaccinService";

@Component({
  selector: 'app-appointement-details',
  templateUrl: './appointement-details.component.html',
  styleUrls: ['./appointement-details.component.css']
})
export class AppointementDetailsComponent implements OnInit {

  app : Appointement;

  isVet: boolean = true
  isOpen: boolean = false

  maxDate: Date = new Date()

  notesList: Note[] = []
  vaccinForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AppointementDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {
    this.app = data.app

    if(this.app.date >= (new Date())){
      this.isOpen = true
    }

    this.vaccinForm = this.formBuilder.group({
      vaccins: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
  }

  formatDateLocaleDateString(date: Date): string{
    return DateService.formatDateLocaleDateString(date)
  }

  formatDateLocaleDateStringWithouthours(date: Date): string{
    return DateService.formatDateLocaleDateStringWithoutHours(date)
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getGMapLink(){
    return GoogleMapService.generateGoogleMapUri(this.app.veterinary)
  }

  getSterilisedCatrate(){
    return this.app.healthRecord.sterilised?"Oui":"Non";
  }

  saveHealthRecord(){
    console.log(this.getNotes())
    console.log(VaccinService.formArrayToList(this.vaccins))
  }

  removeVaccinFromList(idx: number) {
    this.vaccins.removeAt(idx)
  }

  removeNotesFromList(idx: number) {
    this.notesList.splice(idx, 1)
  }

  addVaccin(){
    let vaccinControl = this.formBuilder.group({
      name: ['', [ Validators.required]],
      dateVaccin : ['', [Validators.required]],
      dateRecall : ['']
    })
    this.vaccins.push(vaccinControl)
  }

  addNotes(){
    this.notesList.push(new Note("", new Date()))
  }

  get vaccins() {
    return this.vaccinForm.controls["vaccins"] as FormArray;
  }

  getNotes(): Note[] {
    let notes: Note[] = []
    for (let i: number = 0; i < this.notesList.length; i++) {
      if (this.notesList[i].informations) {
        notes.push(this.notesList[i])
      }
    }
    return notes
  }
}
