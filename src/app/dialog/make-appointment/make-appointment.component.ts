import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../services/toast-service/toast.service";
import {Router} from "@angular/router";
import {DialogRecordComponent} from "../dialog-new-record/dialog-record.component";
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";
import {HealthRecord} from "../../models/healthRecord";
import {User} from "../../models/user";
import {DateService} from "../../services/DateService";
import {HealthRecordServiceService} from "../../services/healthRecord-service/health-record-service.service";
import {GoogleMapService} from "../../services/GoogleMapService";

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  hrList: HealthRecord[] = []
  appointmentTypeList: string[] = []
  veterinary: User
  date: Date

  constructor(public dialogRef: MatDialogRef<DialogRecordComponent>, private hrService: HealthRecordServiceService,
              private formBuilder: FormBuilder, private appointmentService: AppointmentServiceService,
              private toastService: ToastService, private router: Router,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.veterinary = data.vet
    this.date = new Date(data.date)

    data.hrList.forEach((hr: any) => {
      this.hrService.getHealthRecord(hr).subscribe(data => {
        this.hrList.push(data)
      })
    })

    this.appointmentTypeList = data.vet.appointmentType

    this.appointmentForm = this.formBuilder.group({
      date: [data.date, [Validators.required]],
      veterinary: [this.veterinary.id, [Validators.required]],
      appointmentType: ["", [Validators.required]],
      healthRecord: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  formatDateLocaleDateString(date: Date): string{
    return DateService.formatDateLocaleDateString(date)
  }

  validate(){
    let time: Date = new Date(this.appointmentForm.get('date')?.value)
    let offset: number = time.getTimezoneOffset();
    offset = Math.abs(offset / 60);
    time.setHours(time.getHours() + offset);

    let body : any = {
      date: time,
      veterinary: this.appointmentForm.get('veterinary')?.value,
      appointmentType: this.appointmentForm.get('appointmentType')?.value,
      healthRecord: this.appointmentForm.get('healthRecord')?.value,
    }

    this.appointmentService.postAppointment(body).subscribe(data => {
      this.toastService.showMessage("Votre rendez vous a été pris avec succès!")
      this.dialogRef.close()
    }, err => {
      console.log(err)
      this.toastService.showMessage("Une erreur a eu lieu, pendant l'enregistrement de votre rendez vous, réessayer plus tard!")
    })
  }

  getGMapLink(vet: User){
    return GoogleMapService.generateGoogleMapUri(vet)
  }
}
