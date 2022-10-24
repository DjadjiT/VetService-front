import {Component, OnInit} from '@angular/core';
import {Appointement} from "../../models/appointement";
import {User} from "../../models/user";
import {DateService} from "../../services/DateService";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AppointementDetailsComponent} from "../../dialog/appointement-details/appointement-details.component";
import {ActivatedRoute} from "@angular/router";
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";

@Component({
  selector: 'app-appointement-page',
  templateUrl: './appointement-page.component.html',
  styleUrls: ['./appointement-page.component.css']
})
export class AppointementPageComponent implements OnInit {

  appointementList!: Appointement[]
  oldAppointementList!: Appointement[]
  profile!: User

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.profile = data.profile;
      this.appointementList = data.appointments.future;
      this.oldAppointementList = data.appointments.past;
    });
  }

  ngOnInit(): void {

  }


  formatDateLocaleDateString(date: Date): string{
    date = new Date(date)
    return DateService.formatDateLocaleDateString(date)
  }

  openApointement(app: Appointement): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.updateDate(app)

    dialogConfig.data = {
      app: app,
      role: this.profile.role
    }

    dialogConfig.width = '700px';
    dialogConfig.maxWidth = '90vw'
    dialogConfig.maxHeight= '90vh';

    this.dialog.open(AppointementDetailsComponent,
      dialogConfig);
  }

  private updateDate(app: Appointement){
    app.date = new Date(app.date)
    app.requestDate = new Date(app.requestDate)
    app.healthRecord.birthDate = new Date(app.healthRecord.birthDate)

    app.healthRecord.notes.forEach(note => {
      note.date = new Date(note.date)
    })

    app.healthRecord.vaccins.forEach(vacc => {
      vacc.dateVaccin = new Date(vacc.dateVaccin)
      if(vacc.dateRecall) vacc.dateRecall = new Date(vacc.dateRecall)
    })
  }
}
