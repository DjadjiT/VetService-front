import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastService} from "../toast-service/toast.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.proxy+environment.baseUrl+"/auth";

  constructor(private http: HttpClient, private toastService: ToastService,
              private router: Router) {}

  login(body: any): boolean{
    this.http.post<any>(this.baseUrl+"/login",
      body
      ).subscribe(data => {
        this.saveToken(data.token)
        this.showToaster("Bienvenue, vous êtes connecté!")
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });

    },
    err => {
        console.log(err)
      if(err.status == 412){
        this.showToaster("Votre compte n'as pas encore été validé par notre équipe, veuillez attendre le mail de confirmation.")
      }else {
        this.showToaster("L'utilisateur n'existe pas pour ces informations, veuillez réessayer!")
      }
    })
    return false
  }

  private saveToken(token: string){
    localStorage.setItem("token", token)
  }

  logout(){
    localStorage.removeItem("token")
  }

  registerUser(body: any) {
    this.http.post<any>(this.baseUrl+"/register/client",
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        birthdate: body.birthDate,
        password: body.password,
        phoneNb: body.phoneNb
      }
    ).subscribe(data => {
        this.saveToken(data.result)
        this.showToaster("Bienvenue, vous êtes connecté!")
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      err => {
        console.log(err)
        if(err.status == 400){
          this.showToaster("Un utilisateur avec cette adresse mail existe déjà, veuillez modifier l'email!")
        }
        else{
          this.showToaster("Il y a une erreur dans votre formulaire, réessayer plus tard!")
        }
      })
    return false
  }

  registerVet(body: any) {
    this.http.post<any>(this.baseUrl+"/register/vet",
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        birthdate: body.birthdate,
        password: body.password,
        phoneNb: body.phoneNb,
        speciality: body.speciality,
        role: "veterinary",
        institutionName: body.institutionName,
        street: body.street,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
        rpps: body.rpps,
        appointmentType: body.appointmentType,
        paymentMethod: body.paymentMethod
      }
    ).subscribe(data => {
        this.saveToken(data.result)
        this.showToaster("Bienvenue, vous êtes connecté!")
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      err => {
        console.log(err)
        if(err.status == 400){
          this.showToaster("Un utilisateur avec cette adresse mail existe déjà, veuillez modifier l'email!")
        }
        else{
          this.showToaster("Il y a une erreur dans votre formulaire, réessayer plus tard!")
        }
      })
    return false
  }

  registerAdmin(body: any): Observable<User> {
    return this.http.post<User>(this.baseUrl+"/register/admin",
      {
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
      }
    )
  }

  verifyVet(id: string): Observable<any> {
    return this.http.put<any>(this.baseUrl+"/verify-vet/"+id,
      {}, { headers:  this.getAuthorizationHeadersWithToken()}
    )
  }

  deVerifyVet(id: string): Observable<any> {
    return this.http.put<any>(this.baseUrl+"/deactivate/"+id,
      {}, { headers:  this.getAuthorizationHeadersWithToken()}
    )
  }

  showToaster(message: string) {
    this.toastService.showMessage(message);
  }

  getAuthorizationHeadersWithToken(): HttpHeaders {
    let token: string = <string>localStorage.getItem("token")
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
  }
}
