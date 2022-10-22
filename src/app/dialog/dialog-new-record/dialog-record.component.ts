import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HealthRecord} from "../../models/healthRecord";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../models/note";
import {VaccinService} from "../../services/VaccinService";
import {HealthRecordServiceService} from "../../services/healthRecord-service/health-record-service.service";
import {ToastService} from "../../services/toast-service/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-new-record',
  templateUrl: './dialog-record.component.html',
  styleUrls: ['./dialog-record.component.css']
})
export class DialogRecordComponent implements OnInit {

  recordForm: FormGroup;
  notesList: Note[] = [];
  hr!: HealthRecord;

  maxDate: Date;

  animalType: string[] = [
    "Autre",
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
  sexList: [{ type: string; value: string }, { type: string; value: string }, { type: string; value: string }] = [
    {type: 'Mâle', value: "male"},
    {type: 'Femelle', value: "female"},
    {type: 'Autre', value: "other"}
    ]
  sterelisedCase: string[] = ['Oui','Non']


  constructor(public dialogRef: MatDialogRef<DialogRecordComponent>,
              private formBuilder: FormBuilder, private hrService: HealthRecordServiceService,
              private toastService: ToastService, private router: Router,
              @Inject(MAT_DIALOG_DATA) data: any) {

    this.recordForm = this.formBuilder.group({
      type: ['', [ Validators.required]],
      name : ['', [Validators.required]],
      race: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      sterilised : ['', [Validators.required]],
      birthDate : ['', [Validators.required]],
      vaccins: this.formBuilder.array([]),
      notes: this.formBuilder.array([])
    });

    if(data!==null){
      this.hr = data.hr

      this.recordForm = this.formBuilder.group({
        type: [this.hr.type, [ Validators.required]],
        name : [this.hr.name, [Validators.required]],
        race: [this.hr.race, [Validators.required]],
        sex: [this.hr.sex, [Validators.required]],
        sterilised : [ this.hr.sex.toString(), [Validators.required]],
        birthDate : [this.hr.birthDate, [Validators.required]],
        vaccins: this.formBuilder.array([]),
        notes: this.formBuilder.array([])
      });

      this.getVaccins()
      this.notesList = this.hr.notes
    }

    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  saveRecord(){
    let hr : HealthRecord = this.fromFormToRecord();

    this.hrService.postHealthRecord(hr).subscribe(data => {
      this.toastService.showMessage("Le carnet de santé a été ajouté avec succès!")

      this.router.navigate(["/profile"])
      this.dialogRef.close()
    }, err => {
      this.toastService.showMessage("Une erreur a eu lieu, pendant l'enregistrement de votre carnet de sauté!")
      this.dialogRef.close()
    })

  }

  updateRecord(){
    let hr : HealthRecord = this.fromFormToRecord();

    this.hrService.putHealthRecord(hr).subscribe(data => {
      this.toastService.showMessage("Le carnet de santé a été modifié avec succès!")

      this.router.navigate(["/profile"])
      this.dialogRef.close()
    }, err => {
      this.toastService.showMessage("Une erreur a eu lieu, pendant l'enregistrement de votre carnet de sauté!")
      this.dialogRef.close()
    })

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
    let id = undefined;
    if(this.hr) id = this.hr.id
    return new HealthRecord(
      this.recordForm.get('type')?.value,
      this.recordForm.get('name')?.value,
      this.recordForm.get('race')?.value,
      this.recordForm.get('sex')?.value.toLowerCase(),
      this.getStringCompare(this.recordForm.get('sterilised')?.value,"Oui"),
      this.recordForm.get('birthDate')?.value,
      id,
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

  getVaccins(){
    this.hr.vaccins.forEach(vacc => {
      let vaccinControl = this.formBuilder.group({
        name: [vacc.name, [ Validators.required]],
        dateVaccin : [vacc.dateVaccin, [Validators.required]],
        dateRecall : [vacc.dateRecall]
      })
      this.vaccins.push(vaccinControl)
    })
  }

  get vaccins() {
    return this.recordForm.controls["vaccins"] as FormArray;
  }

  getMinDate(): Date| undefined{
    if(this.recordForm.get('birthDate')?.value != null){
      return new Date(this.recordForm.get('birthDate')?.value)
    }
    return undefined
  }

  isSexChecked(radio :string): boolean{
    if(!this.hr) return false
    return this.hr.sex.toLowerCase() == radio.toLowerCase()
  }

  isCastratedChecked(radio :string): boolean{
    if(!this.hr) return false
    return (this.hr.sterilised && radio=="Oui") || (!this.hr.sterilised && radio=="Non")
  }
}
