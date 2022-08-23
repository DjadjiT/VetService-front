import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GoogleMapService} from "../services/GoogleMapService";
import {User} from "../models/user";
import {DateService} from "../services/DateService";
import {Appointement} from "../models/appointement";
import {MockService} from "../services/MockService";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User

  invoiceList = []
  appointmentList: Appointement[] = []

  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.user = data.vet

    this.appointmentList.push(MockService.mockAppointment())
    this.appointmentList.push(MockService.mockAppointmentOld())
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getGMapLink(){
    return GoogleMapService.generateGoogleMapUri(this.user)
  }

  formatDateLocaleDateString(date: Date): string{
    return DateService.formatDateLocaleDateString(date)
  }

  refuseVet(){
    this.dialogRef.close();
  }

  deactivateVet(){

  }

  sendReminderInvoice(){

  }

  validateVet(){

    this.dialogRef.close();
  }


}
