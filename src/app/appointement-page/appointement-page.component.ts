import {Component, OnInit} from '@angular/core';
import {Appointement} from "../models/appointement";
import {User} from "../models/user";
import {MockService} from "../services/MockService";
import {DateService} from "../services/DateService";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AppointementDetailsComponent} from "../appointement-details/appointement-details.component";

@Component({
  selector: 'app-appointement-page',
  templateUrl: './appointement-page.component.html',
  styleUrls: ['./appointement-page.component.css']
})
export class AppointementPageComponent implements OnInit {

  appointementList: Appointement[]
  oldAppointementList: Appointement[]

  constructor(public dialog: MatDialog) {
    this.appointementList = this.getAppointement()
    this.oldAppointementList = this.getOldAppointmentList()
    this.currentUser = MockService.mockUser()
  }

  ngOnInit(): void {

  }

  currentUser: User


  getAppointement(): Appointement[]{
    let list : Appointement[] = this.getMockAppointementsList()

    return list.sort(function(a,b){
      return a.date.getTime() - b.date.getTime();
    });
  }

  getMockAppointementsList(): Appointement[]{
    return [
      MockService.mockAppointment(),
      MockService.mockAppointment2(),
    ];
  }

  getMockOldAppointementsList(): Appointement[]{
    return [
      MockService.mockAppointmentOld(),
      MockService.mockAppointmentOld(),
      MockService.mockAppointmentOld(),
      MockService.mockAppointmentOld(),
      MockService.mockAppointmentOld(),
    ];
  }


  getOldAppointmentList(): Appointement[] {
    let list : Appointement[] = this.getMockOldAppointementsList()

    return list.sort(function(a,b) {
      return a.date.getTime() - b.date.getTime();
    });
  }

  formatDateLocaleDateString(date: Date): string{
    return DateService.formatDateLocaleDateString(date)
  }

  openApointement(app: Appointement): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      app: app
    }
    dialogConfig.width = '700px';
    dialogConfig.maxWidth = '90vw'
    dialogConfig.maxHeight= '90vh';

    this.dialog.open(AppointementDetailsComponent,
      dialogConfig);
  }

}
