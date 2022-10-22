import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  frequencyList = frequencyList;
  userReceiverList = [
    {type: "client" , value: 'Client'},
    {type: "veterinary", value: 'Vétérinaire'}
  ];

  hide : boolean = true;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private route: ActivatedRoute,
              private userService: UserService, private authService: AuthService,
              private appointmentService: AppointmentServiceService, private toastService: ToastService,
              private stripeService: StripeService, private newsletterService: NewsletterService) {
    this.route.data.subscribe(data => {
      this.adminList = data.adminList
      this.vetToValidate = data.invalidVetList
      this.vetList = data.vetList
    });

    this.adminForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(5)]],
    });

    this.newsletterForm = this.formBuilder.group({
      frequency : ['', [Validators.required]],
      message: ['', [Validators.required]],
      object: ['', [Validators.required]],
      receiver : ['', [Validators.required]],
    });

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


  removeFromAdmin(admin: User){
    this.userService.deleteUserById(admin.id).subscribe(data => {
      this.toastService.showMessage("Vous avez bien supprimé ce compte admin de VetService.")
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
      this.adminForm.get("frequency")?.value,
      this.adminForm.get("message")?.value,
      this.adminForm.get("object")?.value,
      this.adminForm.get("receiver")?.value,
      undefined)

    this.newsletterService.postNewsletter(body).subscribe(data => {
      console.log(data)
        this.toastService.showMessage("La newsletter a bien été enregistré!")
      },
      err => {
        console.log(err)
        this.toastService.showMessage("Impossible d'enregistrer la newsletter, veuillez réessayer plus tard!")
      })
  }
}{

}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
