import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointement} from "../../models/appointement";
import {DateService} from "../../services/DateService";
import {GoogleMapService} from "../../services/GoogleMapService";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VaccinService} from "../../services/VaccinService";
import {User} from "../../models/user";
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";
import {ToastService} from "../../services/toast-service/toast.service";
import {HealthRecordServiceService} from "../../services/healthRecord-service/health-record-service.service";
import {HealthRecord} from "../../models/healthRecord";
import {NoteService} from "../../services/NoteService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointement-details',
  templateUrl: './appointement-details.component.html',
  styleUrls: ['./appointement-details.component.css']
})
export class AppointementDetailsComponent implements OnInit {

  app : Appointement;

  vet!: User
  role!: string

  isVet: boolean = true
  isOpen: boolean = false

  maxDate: Date = new Date()

  hrForm: FormGroup;

  changeDate: boolean = false
  newDate: Date = new Date()
  vetDispoList: string[] = []

  hr!: HealthRecord


  constructor(public dialogRef: MatDialogRef<AppointementDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private formBuilder: FormBuilder,
              private toastService: ToastService, private appointmentService: AppointmentServiceService,
              private hrService: HealthRecordServiceService, private router: Router) {
    this.app = data.app
    this.role = data.role
    this.hr = this.app.healthRecord

    console.log(this.app.healthRecord)

    if(this.app.date >= (new Date())){
      this.isOpen = true
    }

    if(this.hr.deleted){
      this.isOpen = false
    }

    this.hrForm = this.formBuilder.group({
      vaccins: this.formBuilder.array([]),
      notes: this.formBuilder.array([])
    });
    this.updVaccins();
    this.updNotes()
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
    let hr = this.fromFormToRecord()

    this.hrService.putHealthRecord(hr).subscribe(data => {
      this.toastService.showMessage("Le carnet de santé a été modifié avec succès!")
    }, err => {
      this.toastService.showMessage("Une erreur a eu lieu, pendant l'enregistrement de votre carnet de sauté!")
    })
  }

  removeVaccinFromList(idx: number) {
    this.vaccins.removeAt(idx)
  }

  removeNotesFromList(idx: number) {
    this.notes.removeAt(idx)
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
    let noteControl = this.formBuilder.group({
      informations: ["", [ Validators.required]],
      date : [new Date()],
    })
    this.notes.push(noteControl)
  }

  get vaccins() {
    return this.hrForm.controls["vaccins"] as FormArray;
  }

  get notes() {
    return this.hrForm.controls["notes"] as FormArray;
  }

  getSpeciality(){
    return this.app.veterinary.speciality[0].toUpperCase() + this.app.veterinary.speciality.slice(1)
  }

  deleteAppointment(){
    this.appointmentService.deleteAppointmentById(this.app.id).subscribe(data => {
      this.toastService.showMessage("L'annulation de votre rendez-vous a été pris en compte!")
      this.router.navigate(["/appointement"]).then(() => {
        window.location.reload();
      });
    }, err => {
      this.toastService.showMessage("Une erreur est survenue, veuillez réessayer plus tard")
    })
  }

  putAppointment(date: string){
    this.appointmentService.putAppointment(new Date(date), this.app.id).subscribe(data => {

      this.toastService.showMessage("Le changement de date de votre rendez-vous, a bien été pris en compte!")
      window.location.reload();
    }, err => {
      this.toastService.showMessage("Une erreur est survenue, veuillez réessayer plus tard")
    })
  }

  getDateStr(dateStr: string){
    let date = new Date(dateStr)
    return date.getHours()+":"+date.getMinutes()
  }

  updateDispoList(){
    this.appointmentService.getVetDisponibility(this.app.veterinary.id, this.newDate).subscribe(data => {

      this.vetDispoList = data.dispoList
      if(this.vetDispoList.length==0){
        this.toastService.showMessage("Aucune date disponible pour ce jour, veuillez chercher un autre jour.")
      }
    }, err => {
      this.toastService.showMessage("Une erreur est survenue, veuillez réessayer plus tard")
    })
  }


  updVaccins(){
    this.hr.vaccins.forEach(vacc => {
      let vaccinControl = this.formBuilder.group({
        name: [vacc.name, [ Validators.required]],
        dateVaccin : [vacc.dateVaccin, [Validators.required]],
        dateRecall : [vacc.dateRecall]
      })
      this.vaccins.push(vaccinControl)
    })
  }


  updNotes(){
    this.hr.notes.forEach(note => {
      let noteControl = this.formBuilder.group({
        informations: [note.informations, [ Validators.required]],
        date : [note.date, [Validators.required]]
      })
      this.notes.push(noteControl)
    })
  }

  fromFormToRecord() : HealthRecord{
    return new HealthRecord(
      this.hr.type,
      this.hr.name,
      this.hr.race,
      this.hr.sex,
      this.hr.sterilised,
      this.hr.birthDate,
      this.hr.id,
      VaccinService.formArrayToList(this.vaccins),
      NoteService.formArrayToList(this.notes)
    )
  }

}
