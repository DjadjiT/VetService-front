import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SPECIALITYLIST} from "../../models/Constant";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";
import {GoogleMapService} from "../../services/GoogleMapService";
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MakeAppointmentComponent} from "../../dialog/make-appointment/make-appointment.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  searchForm: FormGroup;
  speciality : string[] = SPECIALITYLIST;
  filteredOptions: Observable<string[]>;
  result: any[] = [];
  loading: boolean = false;
  maxDate: Date = new Date();
  profile! : User;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentServiceService,
              private route: ActivatedRoute, public dialog: MatDialog) {

    this.route.data.subscribe(data => this.profile = data.profile);

    this.searchForm = this.formBuilder.group({
      city : ['', [Validators.required]],
      date: ['', [Validators.required]],
      postalCode : [''],
      speciality: ['', [Validators.required]],
    });
    this.filteredOptions = this.specialityForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  ngOnInit(): void {
  }

  get specialityForm(){
    return this.searchForm.get("speciality") as FormControl;
  }

  getPostalCodeLength(){
    return this.searchForm.get("postalCode")?.value.length;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.speciality.filter(option => option.toLowerCase().includes(filterValue));
  }

  search(){
    this.loading = true
    let city = this.searchForm.get('city')?.value
    let postalCode = this.searchForm.get('postalCode')?.value
    let speciality = this.searchForm.get('speciality')?.value
    let date = this.searchForm.get('date')?.value


    this.appointmentService.getAppointmentWithFilter(
      speciality, date, city, postalCode).subscribe(data => {
      this.result = data
      this.loading = false
    }, err => {
      console.log(err)
      this.loading = false
    })
  }

  getGMapLink(vet: User){
    return GoogleMapService.generateGoogleMapUri(vet)
  }

  getDateStr(dateStr: string){
    let date = new Date(dateStr)
    return date.getHours()+":"+date.getMinutes()
  }

  isPaymentPresent(elem: string, vetUser: User){
    return vetUser.paymentMethod.includes(elem)
  }

  openDialog(date: Date, vet: User){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      vet: vet,
      date: date,
      hrList: this.profile.healthRecords,
    }

    dialogConfig.width = '900px';
    dialogConfig.maxWidth = '80vw'
    dialogConfig.maxHeight= '80vh';

    this.dialog.open(MakeAppointmentComponent, dialogConfig);
  }

  clearSearchBar(){
    this.searchForm.controls["speciality"].setValue("")
  }
}
