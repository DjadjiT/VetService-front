import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HealthRecord} from "../../models/healthRecord";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogRecordComponent} from "../../dialog/dialog-new-record/dialog-record.component";
import {paymentMethod, SPECIALITYLIST} from "../../models/Constant";
import {UserService} from "../../services/user-service/user.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HealthRecordServiceService} from "../../services/healthRecord-service/health-record-service.service";
import {ToastService} from "../../services/toast-service/toast.service";
import {Schedule} from "../../models/Schedule";
import {StripeService} from "../../services/stripe-service/stripe.service";
import {Invoice} from "../../models/invoice";
import {DateService} from "../../services/DateService";
import {ErrorMessageService} from "../../services/ErrorMessageService";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  specialityList : string[] = SPECIALITYLIST;
  form: FormGroup;
  submitted = false;
  hide : boolean = true;
  editMode : boolean = true;
  profile! : User;
  healthRecord: HealthRecord[] = []
  paymenentMethodList: any[]= []
  scheduleForm: FormGroup
  invoiceList: Invoice[] = []
  loading: boolean = true

  subscriptionPaid : boolean = false


  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
              private toastService: ToastService, private router: Router,
              private userService: UserService, private authService: AuthService,
              private route: ActivatedRoute, private hrService: HealthRecordServiceService,
              private stripeService: StripeService) {

    this.route.data.subscribe(data => this.profile = data.profile);

    this.profile.healthRecords.forEach(e => {
      hrService.getHealthRecord(e).subscribe(
        data => {
          let hr: HealthRecord = data

          this.healthRecord.push(hr)
        }
      )
    })

    if(this.profile.role == "veterinary"){
      let spec: string = this.profile.speciality[0].toUpperCase()+this.profile.speciality.slice(1)
      this.form = this.formBuilder.group({
        phoneNb: [this.profile.phoneNb, [ Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]],
        email : [this.profile.email, [Validators.required, Validators.email]],
        firstName: [this.profile.firstName, [Validators.required]],
        lastName: [this.profile.lastName, [Validators.required]],
        password : ["", [Validators.required, Validators.minLength(5)]],
        institutionName: [this.profile.institutionName, [Validators.required]],
        street : [this.profile.street, [Validators.required]],
        postalCode : [this.profile.postalCode, [Validators.required]],
        city : [this.profile.city, [Validators.required]],
        country : [{value:"France", disabled: true}],
        speciality : [spec, [Validators.required]],
        rpps: [this.profile.rpps, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        informations: [this.profile.informations, []],
        selectedPayments: new FormArray([]),
        appointmentArray: new FormArray([]),
      });

      this.profile.appointmentType.forEach(app => {
        let newApp = this.formBuilder.group({
          name: [app, Validators.required]
        })
        this.appointmentArray.push(newApp)
      })

      paymentMethod.forEach(payment => {
        this.paymenentMethodList.push({
          name: payment,
          value: this.isPMpresent(payment)
        })
      })

      this.form.controls["email"].disable()

      if(this.profile.schedule == undefined || this.profile.schedule.workingDay.length<7){
        this.profile.schedule = new Schedule([
            true,
            true,
            true,
            true,
            true,
            false,
            false,
          ],
          "08:00","12:00" , "13:30","18:00"
        )
      }

      this.scheduleForm = this.formBuilder.group({
        start: [this.profile.schedule.startingHour, [Validators.required]],
        pause: [this.profile.schedule.pauseStart, [Validators.required]],
        endPause: [this.profile.schedule.pauseFinish, [Validators.required]],
        end: [this.profile.schedule.finishingHour, [Validators.required]],
      });

      this.stripeService.getMySubcription().subscribe(data => {
        this.loading = false
        data.forEach(inv => {
          this.invoiceList.push(inv)

          let today = new Date()
          today.setDate(today.getDate() - 365);
          if(new Date(inv.startDate) > today){
            this.subscriptionPaid = true
          }
        })
      }, err => {
        this.loading= false
      })

      this.invoiceList.sort((a,b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
      console.log(this.invoiceList)
    }

    else {
      this.form = this.formBuilder.group({
        phoneNb: [this.profile.phoneNb, [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]],
        email: [this.profile.email, [Validators.required, Validators.email]],
        firstName: [this.profile.firstName, [Validators.required]],
        lastName: [this.profile.lastName, [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(5)]],
      });
      this.form.controls["email"].disable()

      this.scheduleForm = this.formBuilder.group({});
    }
  }


  ngOnInit(): void {

  }

  isPMpresent(checkBoxName: string){
    return this.profile.paymentMethod.includes( checkBoxName.toLowerCase())
  }

  canSave() {
    if(this.checkInputField()){
      if (this.profile.role == "veterinary") {
        //TODO mettre à jour le système de consultation & payment method

        let body = {
          email: this.profile.email,
          firstName: this.form.get("firstName")?.value,
          lastName: this.form.get("lastName")?.value,
          password: this.form.get("password")?.value,
          phoneNb: this.form.get("phoneNb")?.value,
          speciality: this.form.get("speciality")?.value,
          informations: this.form.get("informations")?.value,
          institutionName: this.form.get("institutionName")?.value,
          role: "veterinary",
          street: this.form.get("street")?.value,
          postalCode: this.form.get("postalCode")?.value,
          city: this.form.get("city")?.value,
          country: this.form.get("country")?.value,
          rpps: this.form.get("rpps")?.value,
          appointmentType: this.getSelectedAppointment(),
          paymentMethod: this.getPaymentMethod(),
        }


        this.profile.schedule.startingHour = this.scheduleForm.get("start")?.value
        this.profile.schedule.pauseStart = this.scheduleForm.get("pause")?.value
        this.profile.schedule.pauseFinish = this.scheduleForm.get("endPause")?.value
        this.profile.schedule.finishingHour = this.scheduleForm.get("end")?.value

        this.userService.putUser(body).subscribe(data => {
          this.userService.updateUserSchedule(this.profile.schedule).subscribe(data => {
            this.toastService.showMessage("Votre profil a bien été modifié.")
            window.location.reload();
          }, err => {
            this.toastService.showMessage("Votre profil a bien été modifié mais votre planning n'as pas été pris en compte.")
          })

        }, err => {
          this.toastService.showMessage("Une erreur est survenue, veuillez réessayer plus tard")
        })

      } else {

        let body = {
          email: this.profile.email,
          firstName: this.form.get("firstName")?.value,
          lastName: this.form.get("lastName")?.value,
          password: this.form.get("password")?.value,
          phoneNb: this.form.get("phoneNb")?.value
        }
        if(this.form.get("password")?.value.length<5 && this.form.get("password")?.value!=''){
          this.toastService.showMessage("Veuillez rentrer un mot de passe de plus de 5 caractère.")
        }else{
          this.userService.putUser(body).subscribe(data => {
            this.toastService.showMessage("Votre profil a bien été modifié.")
            window.location.reload();
          }, err => {
            this.toastService.showMessage("Une erreur est survenue, veuillez réessayer plus tard")
          })
        }
      }
    }else{
      this.toastService.showMessage("Les champs n'ont pas été remplis correctement.")
    }
  }

  checkInputField(): boolean{
    if(this.profile.role == "veterinary"){
      return this.firstName.valid &&this.lastName.valid &&this.phoneNb.valid
        && this.speciality.valid &&this.institutionName.valid &&this.street.valid &&this.postalCode.valid
        && this.city.valid &&this.rpps.valid
    }else {
      return this.firstName.valid &&this.lastName.valid &&this.phoneNb.valid
    }
  }


  deleteRecord(id: number){
    this.hrService.deleteHealthRecord(this.healthRecord[id].id)
      .subscribe(data => {
        this.toastService.showMessage("Votre carnet de santé a été supprimé!")
        this.router.navigate(["/profile"]).then(() => {
          window.location.reload();
        });
      }, err => {
        this.toastService.showMessage("Il y a eu une erreur lors de la suppression du carnet de santé!")
        this.router.navigate(["/profile"]).then(() => {
          window.location.reload();
        });
      })

  }

  editRecord(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      hr: this.healthRecord[id]
    }
    dialogConfig.width = '900px';
    dialogConfig.height = '700px';
    dialogConfig.maxWidth = '80vw'
    dialogConfig.maxHeight= '80vh';

    this.dialog.open(DialogRecordComponent, dialogConfig);
  }

  newRecord(){
    this.dialog.open(DialogRecordComponent, {
      width: '900px',
      height: '700px',
    });
  }

  removeSelectedAppointment(idx: number){
    this.appointmentArray.removeAt(idx);
  }

  addSelectedAppointment(){
    let app = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.appointmentArray.push(app)
  }

  getPostalCodeLength(){
    return this.form.get("postalCode")?.value.length;
  }

  getPaymentMethod(){
    let res : string[] = []

    for(let i =0; i < this.paymenentMethodList.length ; i++){
      if(this.paymenentMethodList[i].value)
        res.push(this.paymenentMethodList[i].name.toLowerCase())
    }
    return res
  }

  getSelectedAppointment(): string[]{
    let res : string[] = []

    for(let i =0; i < this.appointmentArray.value.length ; i++){
      res.push(this.appointmentArray.value[i].name)
    }
    return res
  }

  get appointmentArray(){
    return this.form.controls["appointmentArray"] as FormArray;
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
  }

  createSession(){
    this.userService.requestMemberSession().subscribe(data => {
      this.userService.redirectToCheckout(data.sessionId)
    })
  }

  formatDateLocaleDateString(date: string): string{
    return DateService.formatDateLocaleDateString(new Date(date))
  }

  getFieldErrorMessage(mode: string, min: number, formControl: FormControl){
    switch (mode){
      case "email":
        return ErrorMessageService.getEmailErrorMessage(formControl)
      case "required":
        return ErrorMessageService.getEmailErrorMessage(formControl)
      case "minLength":
        return ErrorMessageService.getFieldErrorMinLength(formControl, min)
      case "pattern":
        return ErrorMessageService.getFieldErrorPhoneNumber(formControl)
    }
    return ""
  }

  get email(): FormControl{
    return this.form.controls["email"] as FormControl;
  }
  get password(): FormControl{
    return this.form.controls["password"] as FormControl;
  }
  get phoneNb(): FormControl{
    return this.form.controls["phoneNb"] as FormControl;
  }
  get firstName(): FormControl{
    return this.form.controls["firstName"] as FormControl;
  }
  get lastName(): FormControl{
    return this.form.controls["lastName"] as FormControl;
  }
  get speciality(): FormControl{
    return this.form.controls["speciality"] as FormControl;
  }
  get institutionName(): FormControl{
    return this.form.controls["institutionName"] as FormControl;
  }
  get street(): FormControl{
    return this.form.controls["street"] as FormControl;
  }
  get postalCode(): FormControl{
    return this.form.controls["postalCode"] as FormControl;
  }
  get city(): FormControl{
    return this.form.controls["city"] as FormControl;
  }
  get rpps(): FormControl{
    return this.form.controls["rpps"] as FormControl;
  }

}
