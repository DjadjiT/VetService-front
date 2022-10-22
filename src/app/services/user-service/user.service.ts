import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastService} from "../toast-service/toast.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {AuthService} from "../auth-service/auth.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Schedule} from "../../models/Schedule";
import {loadStripe} from "@stripe/stripe-js";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.proxy+environment.baseUrl+"/user";

  constructor(private http: HttpClient, private toastService: ToastService,
              private router: Router, private authService: AuthService) { }

  getCurrentUser(): Observable<User>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<User>(this.baseUrl, {headers: header}).pipe()
  }

  getUserById(id: string): Observable<User>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<User>(this.baseUrl+"/"+id, {headers: header})
  }

  deleteUserById(id: string): Observable<User>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.delete<User>(this.baseUrl+"/"+id, {headers: header})
  }

  putUser(body: any) : Observable<User>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    console.log(body)
    if(body.role === "veterinary"){
      return this.updateVet(body, header)
    }else {
      return this.updateUser(body, header)
    }
  }

  updateUser(body: any, header: HttpHeaders) : Observable<User>{
    return this.http.put<User>(this.baseUrl,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        birthdate: body.birthDate,
        password: body.password,
        phoneNb: body.phoneNb
      }, {headers: header}
    )
  }

  updateVet(body: any, header: HttpHeaders) : Observable<User>{
    return this.http.put<User>(this.baseUrl,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        birthdate: body.birthdate,
        phoneNb: body.phoneNb,
        password: body.password,
        speciality: body.speciality.toLowerCase(),
        appointmentType: body.appointmentType,
        paymentMethod: body.paymentMethod,
        informations: body.informations,
        institutionName: body.institutionName,
        street: body.street,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
        rpps: body.rpps,
      }, {headers: header}
    )
  }

  updateUserSchedule(schedule: Schedule) : Observable<User>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.put<User>(this.baseUrl+"/schedule",
      {
        startingHour: schedule.startingHour,
        pauseStart: schedule.pauseStart,
        pauseFinish: schedule.pauseFinish,
        finishingHour: schedule.finishingHour,
        workingDay: schedule.workingDay
      }, {headers: header}
    )
  }

  getUserListByRole(role: string): Observable<User[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<User[]>(this.baseUrl+"/role-list/"+role, {headers: header})
  }

  getInvalidVetList(): Observable<User[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<User[]>(this.baseUrl+"/invalid-vet", {headers: header})
  }

  postSubscription(): Observable<any>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.post<any>("/create-subscription", {
    },{headers: header})
  }

  requestMemberSession(){
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.post<any>(this.baseUrl+"/create-session", {
    },{headers: header})
  }

  async redirectToCheckout(sessionId: string){
    const stripe = await loadStripe("pk_test_51LJDWtK6LFtOfBbRrWP5qGJhELzxImM2zjRUOhc2xZENnCxGySmw5zsnBh05OapNhcDFr9HuaiIynYgpg7tyIsoP00llplV2Qh");

    stripe?.redirectToCheckout({
      sessionId: sessionId
    })
  }


}
