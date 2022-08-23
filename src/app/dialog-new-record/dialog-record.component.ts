import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HealthRecord} from "../models/healthRecord";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vaccin} from "../models/vaccin";
import {Note} from "../models/note";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VaccinService} from "../services/VaccinService";

@Component({
  selector: 'app-dialog-new-record',
  templateUrl: './dialog-record.component.html',
  styleUrls: ['./dialog-record.component.css']
})
export class DialogRecordComponent implements OnInit {

  recordForm: FormGroup;
  vaccinForm: FormGroup;
  notesList: Note[];

  constructor(public dialogRef: MatDialogRef<DialogRecordComponent>,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {

    this.recordForm = this.formBuilder.group({
      type: ['', [ Validators.required]],
      name : ['', [Validators.required]],
      race: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      sterilised : ['', [Validators.required]],
      birthDate : ['', [Validators.required]]
    });

    this.vaccinForm = this.formBuilder.group({
      vaccins: this.formBuilder.array([])
    });

    this.notesList = [];

    this.maxDate = new Date();
  }
  maxDate: Date;

  animalType: string[] = [
    "Amphibiens : la grenouille rieuse, l’axolotl, le dendrobate, etc.",
    "Arthropodes : l’araignée, le scorpion, le myriapode, etc.",
    "Chat",
    "Chien",
    "Crustacés : la crevette, le bernard-l’hermite, etc.",
    "Furet",
    "Gallinacés : la poule, le paon, le canard, l’oie, le dindon, etc.",
    "Insectes",
    "Lézards",
    "Mollusques : les escargots de Bourgogne, etc.",
    "Oiseaux",
    "Poissons",
    "Primates",
    "Putois",
    "Rongeurs",
    "Serpents",
    "Tortues",
    "Vison"
  ]
  sexList: string[] = ['Mâle','Femelle', 'Autre']
  sterelisedCase: string[] = ['Oui','Non']

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  saveRecord(){
    let hr : HealthRecord = this.fromFormToRecord();
    console.log(hr)
    this._snackBar.open("Le carnet de santé de votre animal"+ hr.name+"a été crée avec succès !", "Fermer");
    this.dialogRef.close()
  }

  addNewVaccin(){
    let vaccinControl = this.formBuilder.group({
      name: ['', [ Validators.required]],
      dateVaccin : ['', [Validators.required]],
      dateRecall : ['']
    })
    this.vaccins.push(vaccinControl)
  }

  addNewNote(){
    let newNote = new Note("", new Date())
    this.notesList.push(newNote)
  }

  removeVaccin(idx: number){
    this.vaccins.removeAt(idx)
  }

  removeNotes(idx: number){
    this.notesList.splice(idx, 1)
  }

  fromFormToRecord() : HealthRecord{
    return new HealthRecord(
      this.recordForm.get('type')?.value,
      this.recordForm.get('name')?.value,
      this.recordForm.get('race')?.value,
      this.recordForm.get('sex')?.value,
      this.getStringCompare(this.recordForm.get('sterilised')?.value,"Oui"),
      this.recordForm.get('birthDate')?.value,
      undefined,
      VaccinService.formArrayToList(this.vaccins),
      this.convertNotes()
    )
  }

  getStringCompare(a: string, b : string){
    return a.toLowerCase()===b.toLowerCase()
  }

  convertNotes(): Note[] {
    let notes: Note[] = []
    for(let i : number= 0; i< this.notesList.length; i++){
      if(this.notesList[i].informations){
        notes.push(this.notesList[i])
      }
    }
    return notes
  }

  get vaccins() {
    return this.vaccinForm.controls["vaccins"] as FormArray;
  }

  getMinDate(): Date| undefined{
    if(this.recordForm.get('birthDate')?.value != null){
      return new Date(this.recordForm.get('birthDate')?.value)
    }
    return undefined
  }
}
