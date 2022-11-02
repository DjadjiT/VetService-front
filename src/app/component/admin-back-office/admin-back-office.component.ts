import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {Sort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user-service/user.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {AppointmentServiceService} from "../../services/appointment-service/appointment-service.service";
import {ToastService} from "../../services/toast-service/toast.service";
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Newsletter} from "../../models/Newsletter";
import { frequencyList } from 'src/app/models/Constant';
import {NewsletterService} from "../../services/newsletter-service/newsletter.service";
import {DateService} from "../../services/DateService";
import {ErrorMessageService} from "../../services/ErrorMessageService";
import {StatsServiceService} from "../../services/stats-service/stats-service.service";
import {Order} from "../../models/order";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-admin-back-office',
  templateUrl: './admin-back-office.component.html',
  styleUrls: ['./admin-back-office.component.css']
})
export class AdminBackOfficeComponent implements OnInit {

  adminForm: FormGroup;
  newsletterForm: FormGroup;

  vetList: User[] = []
  vetToValidate: User[]= []
  adminList: User[]= []
  color = '#D02F27'
  newsletterList: Newsletter[] = []
  orderInPreparationList: Order[] = []
  orderList: Order[] = []
  filteredOrderList: Order[] = []

  oderDataSource!: MatTableDataSource<Order>

  frequencyList = frequencyList;
  userReceiverList = [
    {type: "client" , value: 'Client'},
    {type: "veterinary", value: 'Vétérinaire'}
  ];

  hide : boolean = true;

  userStats: any
  appStats: any
  hrStats: any

  view: [number, number] = [900, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;

  maxDate: Date = new Date()

  shippingStatusList: any[] = [
    {
      label: "En préparation",
      value: "preparation"
    },
    {
      label: "En transit",
      value: "shipped"
    },
    {
      label: "Livré",
      value: "delivered"
    },
  ]

  filterShoppingStatus: string = ""

  appStatsForm: FormGroup


  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private route: ActivatedRoute,
              private userService: UserService, private authService: AuthService,
              private appointmentService: AppointmentServiceService, private toastService: ToastService,
              private stripeService: StripeService, private newsletterService: NewsletterService,
              private statsService: StatsServiceService) {
    this.route.data.subscribe(data => {
      this.adminList = data.adminList
      this.vetToValidate = data.invalidVetList
      this.vetList = data.vetList
      this.newsletterList = data.newsletterList
      this.newsletterList.sort((a,b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      this.appStats = data.appStats
      this.userStats = data.userStats
      this.hrStats = data.hrStats
      this.orderInPreparationList = data.orderInPreparationList
      this.orderList = data.orderList
      this.filteredOrderList = this.orderList
      this.oderDataSource = new MatTableDataSource(this.orderList)
    });

    this.adminForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(5)]],
    });

    this.newsletterForm = this.formBuilder.group({
      message: ['', [Validators.required]],
      object: ['', [Validators.required]],
      receiver : ['', [Validators.required]],
    });

    this.appStatsForm = this.formBuilder.group({
      startDate : ["", [Validators.required]],
      endDate : ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  sortVetData(sort: Sort) {
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

  sortvetToValidate(sort: Sort) {
    const data = this.vetToValidate.slice();
    if (!sort.active || sort.direction === '') {
      this.vetToValidate = data;
      return;
    }

    this.vetToValidate = data.sort((a, b) => {
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

  sortAdmin(sort: Sort) {
    const data = this.adminList.slice();
    if (!sort.active || sort.direction === '') {
      this.adminList = data;
      return;
    }

    this.adminList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        default:
          return 0;
      }
    });
  }

  sortOrder(sort: Sort) {
    const data = this.orderList.slice();
    if (!sort.active || sort.direction === '') {
      this.orderList = data;
      return;
    }

    this.orderList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'email':
          return compare(a.mail, b.mail, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'shippingMethod':
          return compare(a.shippingMethod, b.shippingMethod, isAsc);
        case 'id':
          return compare(a._id, b._id, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'date':
          if(a.requestDate == undefined){
            return 1
          }else if(b.requestDate == undefined){
            return -1
          }
          let d1 = new Date(a.requestDate)
          let d2 = new Date(b.requestDate)
          return compare(d1.getTime(), d2.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  sortNewsletter(sort: Sort) {
    const data = this.newsletterList.slice();
    if (!sort.active || sort.direction === '') {
      this.newsletterList = data;
      return;
    }

    this.newsletterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'message':
          return compare(a.message, b.message, isAsc);
        case 'object':
          return compare(a.object, b.object, isAsc);
        case 'receiver':
          return compare(a.receiver, b.receiver, isAsc);
        case 'date':
          if(a.date == undefined){
            return 1
          }else if(b.date == undefined){
            return -1
          }
          let d1 = new Date(a.date)
          let d2 = new Date(b.date)
          return compare(d1.getTime(), d2.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }
  sortOrderinPreparation(sort: Sort) {
    const data = this.orderInPreparationList.slice();
    if (!sort.active || sort.direction === '') {
      this.orderInPreparationList = data;
      return;
    }

    this.orderInPreparationList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'email':
          return compare(a.mail, b.mail, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'shippingMethod':
          return compare(a.shippingMethod, b.shippingMethod, isAsc);
        case 'id':
          return compare(a._id, b._id, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'date':
          if(a.requestDate == undefined){
            return 1
          }else if(b.requestDate == undefined){
            return -1
          }
          let d1 = new Date(a.requestDate)
          let d2 = new Date(b.requestDate)
          return compare(d1.getTime(), d2.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  removeFromAdmin(admin: User){
    this.userService.deleteUserById(admin.id).subscribe(data => {
      this.toastService.showMessage("Vous avez bien supprimé ce compte admin de VetService.")
      window.location.reload();
    })
  }

  isActive(b: boolean){
    return b?'Oui':'Non'
  }

  postNewAdmin(){
    let body = {
      email : this.adminForm.get("email")?.value,
      firstName: this.adminForm.get("firstName")?.value,
      lastName: this.adminForm.get("lastName")?.value,
      password : this.adminForm.get("password")?.value,
    }

    this.authService.registerAdmin(body).subscribe(data => {
        this.toastService.showMessage("Le compte admin a bien été créer!")
        window.location.reload();
      },
      err => {
        console.log(err)
        if(err.status == 400){
          this.toastService.showMessage("Un utilisateur avec cette adresse mail existe déjà, veuillez modifier l'email!")
        }else{
          this.toastService.showMessage("Il y a une erreur dans votre formulaire, réessayer plus tard!")
        }
      })
  }

  openVetInfo(vet: User){
    this.appointmentService.getAppointmentByUserId(vet.id).subscribe(data => {
      this.stripeService.getUserSubcriptionList(vet.id).subscribe(invList => {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
          vet: vet,
          appointmentHistory: data,
          invoiceList: invList
        }
        dialogConfig.width = '60vw';
        dialogConfig.maxWidth = '90vw'
        dialogConfig.maxHeight= '90vh';

        this.dialog.open(UserDetailsComponent, dialogConfig);
      })
    }, err => {
      this.toastService.showMessage("Une erreur a eu lieu lors de la récupération de ce vétérinaire, veuillez réessayer plus tard!")
    })
  }

  postNewsletter(){
    let body = new Newsletter(
      this.newsletterForm.get("message")?.value,
      this.newsletterForm.get("object")?.value,
      this.newsletterForm.get("receiver")?.value)

    this.newsletterService.postNewsletter(body).subscribe(data => {
        this.toastService.showMessage("La newsletter a bien été envoyé!")
      },
      err => {
        console.error(err)
        this.toastService.showMessage("Impossible d'enregistrer la newsletter, veuillez réessayer plus tard!")
      })
  }

  formatDateLocaleDateString(date: Date): string{
    if(date===null ||date===undefined){
      return "Date inconnu"
    }
    date = new Date(date)
    return DateService.formatDateLocaleDateString(date)
  }

  getFieldErrorMessage(mode: string, min: number, formControl: FormControl){
    switch (mode){
      case "email":
        return ErrorMessageService.getEmailErrorMessage(formControl)
      case "required":
        return ErrorMessageService.getEmailErrorMessage(formControl)
      case "minLength":
        return ErrorMessageService.getFieldErrorMinLength(formControl, min)
    }
    return ""
  }

  get email(): FormControl{
    return this.adminForm.controls["email"] as FormControl;
  }
  get password(): FormControl{
    return this.adminForm.controls["password"] as FormControl;
  }
  get firstName(): FormControl{
    return this.adminForm.controls["firstName"] as FormControl;
  }
  get lastName(): FormControl{
    return this.adminForm.controls["lastName"] as FormControl;
  }


  get message(): FormControl{
    return this.newsletterForm.controls["message"] as FormControl;
  }
  get object(): FormControl{
    return this.newsletterForm.controls["object"] as FormControl;
  }
  get receiver(): FormControl{
    return this.newsletterForm.controls["receiver"] as FormControl;
  }
  get startDate(): Date{
    let date = this.appStatsForm.controls["startDate"] as FormControl
    return new Date(date.value)
  }
  get endDate(): FormControl{
    return this.appStatsForm.controls["endDate"] as FormControl
  }

  getHRChartLabelAndData(){
    let hrData= []

    for(let hr of this.hrStats.animalStats){
      hrData.push({
        name: hr.type.toLowerCase(),
        value: hr.list.length
      })
    }
    return hrData
  }

  getUserChartLabelAndData(){
    let userData= []

    userData.push({
      name: "Client",
      value: this.userStats.client
    })
    userData.push({
      name: "Véterinaire actif",
      value: this.userStats.vetNonActive
    })
    userData.push({
      name: "Vétérinaire non actif",
      value: this.userStats.vetActive
    })

    return userData
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.oderDataSource.filter = filterValue.trim().toLowerCase();
  }

  getAppStatsFormValid(){
    let body = {
      startDate: this.appStatsForm.get("startDate")?.value,
      endDate: this.appStatsForm.get("endDate")?.value,
    }

    this.statsService.getAppointmentStats(body).subscribe(data => {
      this.appStats = data
    })
  }

  getReceiver(receiver: string){
    if(receiver.toLowerCase() === 'veterinary'){
      return "Vétérinaire"
    }else if(receiver.toLowerCase() === 'client'){
      return "Client"
    }
    return ""
  }

  getShippingLabel(shippingMethod: string){
    return shippingMethod==="standard"?"Standard":"Rapide"
  }

  changeOrderStatus(event: any, id: string){
    this.stripeService.putOrder(event.value, id).subscribe(data => {
      this.toastService.showMessage("La commande a bien changé d'étape.")
    })
  }

  filterAllShipping(){
    if(this.filterShoppingStatus === 'tout'){
      this.filteredOrderList = this.orderList
    }else {
      this.filteredOrderList = this.orderList.filter(elem => elem.status==this.filterShoppingStatus)
    }
  }

  filterId(searchValue: any){
    if(searchValue.value == ""){
      this.filteredOrderList = this.orderList
    }else {
      this.filteredOrderList = this.orderList.filter(elem => elem._id.includes(searchValue.value))
    }
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
