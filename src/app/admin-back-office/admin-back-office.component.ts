import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";
import {MockService} from "../services/MockService";
import {Sort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserDetailsComponent} from "../user-details/user-details.component";

@Component({
  selector: 'app-admin-back-office',
  templateUrl: './admin-back-office.component.html',
  styleUrls: ['./admin-back-office.component.css']
})
export class AdminBackOfficeComponent implements OnInit {

  adminForm: FormGroup;

  vetList: User[]
  vetToValidate: User[]
  adminList: User[]
  color = '#D02F27'

  hide : boolean = true;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.adminForm = this.formBuilder.group({
      admins: this.formBuilder.array([])
    });

    this.vetList = []
    this.adminList = []

    this.vetToValidate = []
    this.vetToValidate.push(MockService.mockVetNotActive())
    this.vetToValidate.push(MockService.mockVetNotActive())
    this.vetToValidate.push(MockService.mockVetNotActive())
    this.vetToValidate.push(MockService.mockVetNotActive())

    this.adminList.push(MockService.mockUser())
    this.adminList.push(MockService.mockUser())
    this.adminList.push(MockService.mockUser())
    this.adminList.push(MockService.mockUser())

    this.vetList.push(MockService.mockVet())
    this.vetList.push(MockService.mockVetNotActive())
    this.vetList.push(MockService.mockVet())
    this.vetList.push(MockService.mockVet())
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    const data = this.vetList.slice();
    if (!sort.active || sort.direction === '') {
      this.vetList = data;
      return;
    }

    this.vetList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'active':
          return compare(a.active, b.active, isAsc);
        default:
          return 0;
      }
    });
  }

  removeAdmin(idx: number): void{
    this.admins.removeAt(idx)
  }

  deActivateVet(idx: number): void{

  }

  addUser(): void{

  }

  addAdmin(): void{
    let admin = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(5)]],
    });

    this.admins.push(admin)
  }

  get admins() {
    return this.adminForm.controls["admins"] as FormArray;
  }

  removeFromAdmin(idx: number){
    this.adminList.splice(idx, 1)
  }

  vetActiveChanges(idx: number, event: any){
    //send event.checked
    this.vetList[idx].active=event.checked
  }

  isActive(b: boolean){
    return b?'Oui':'Non'
  }

  openVetDialog(i: number){
    console.log(i)
  }

  openVetInfo(vet: User){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      vet: vet
    }
    dialogConfig.width = '60vw';
    dialogConfig.maxWidth = '90vw'
    dialogConfig.maxHeight= '90vh';

    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
