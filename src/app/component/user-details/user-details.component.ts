import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GoogleMapService} from "../../services/GoogleMapService";
import {User} from "../../models/user";
import {DateService} from "../../services/DateService";
import {Appointement} from "../../models/appointement";
import {ToastService} from "../../services/toast-service/toast.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {StripeService} from "../../services/stripe-service/stripe.service";
import {FormGroup} from "@angular/forms";
import {Invoice} from "../../models/invoice";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User

  appointmentList: Appointement[] = []
  invoiceList: Invoice[] = []

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private toastService: ToastService,
              private authService: AuthService, private stripeService: StripeService) {
    this.user = data.vet
    this.appointmentList = data.appointmentHistory

    for(let i = 0; i<this.appointmentList.length; i++){
      this.appointmentList[i].date = new Date(this.appointmentList[i].date)
    }

    this.appointmentList.sort((a,b) => {
      return a.date.getTime() - b.date.getTime();
    });


    this.invoiceList = data.invoiceList

    this.invoiceList.sort((a,b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }

  ngOnInit(): void {
  }

  isSubscriptionValid(inv: Invoice): boolean{
    let today = new Date()
    today.setDate(today.getDate() - 365);
    return new Date(inv.startDate) > today
  }

  getDivColor(inv: Invoice): string {
    return this.isSubscriptionValid(inv)?"#00AA55":"#D02F27"
  }

  getGMapLink(){
    return GoogleMapService.generateGoogleMapUri(this.user)
  }

  formatDateLocaleDateString(date: Date): string{
    return DateService.formatDateLocaleDateString(date)
  }
  formatStrDateLocaleDateString(date: string): string{
    return DateService.formatDateLocaleDateString(new Date(date))
  }

  deactivateVet(){
    this.authService.deVerifyVet(this.user.id).subscribe(data => {
        this.toastService.showMessage("Le compte v??t??rinaire a ??t?? d??sactiv??!")
        window.location.reload();
      },
      err => {
        if(err.status == 400){
          this.toastService.showMessage("Le v??t??rinaire ne correspond ?? aucun compte, veuillez r??essayer ult??rieurement!")

        }else{
          this.toastService.showMessage("Une erreur est survenue, veuillez r??essayer ult??rieurement!")
        }
      })
  }

  refuseteVetProfile(){
    this.authService.refuseVet(this.user.id).subscribe(data => {
        this.toastService.showMessage("Le compte v??t??rinaire a bien ??t?? refus??!")
        window.location.reload();
      },
      err => {
        if(err.status == 400){
          this.toastService.showMessage("Le v??t??rinaire ne correspond ?? aucun compte, veuillez r??essayer ult??rieurement!")

        }else{
          this.toastService.showMessage("Une erreur est survenue, veuillez r??essayer ult??rieurement!")
        }
      })
  }

  sendReminderInvoice(){
    this.toastService.showMessage("Pour l'instant le bouton n'as pas d'utilit??, nous reviendrons vers vous lorsqu'il y aura du changement.")
  }

  validateVet(){
    this.authService.verifyVet(this.user.id).subscribe(data => {
        this.toastService.showMessage("Le compte v??t??rinaire a ??t?? activ??!")
        window.location.reload();
      },
      err => {
        if(err.status == 400){
          this.toastService.showMessage("Le v??t??rinaire ne correspond ?? aucun compte, veuillez r??essayer ult??rieurement!")
        }else{
          this.toastService.showMessage("Une erreur est survenue, veuillez r??essayer ult??rieurement!")
        }
      })
  }


}
