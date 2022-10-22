import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service/auth.service";
import {Observable} from "rxjs";
import {Appointement} from "../../models/appointement";

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  private baseUrl: string = environment.proxy+environment.baseUrl+"/appointment";

  constructor(private http: HttpClient, private authService: AuthService) { }


  getAppointmentByUserId(id: string): Observable<Appointement>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Appointement>(this.baseUrl+"/user/"+id, {headers: header})
  }

  getMyAppointment(): Observable<any>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<any>(this.baseUrl, {headers: header})
  }

  deleteAppointmentById(id: string): Observable<Appointement>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.delete<Appointement>(this.baseUrl+"/"+id, {headers: header})
  }

  postAppointment(body: any): Observable<Appointement>{
    let header = this.authService.getAuthorizationHeadersWithToken()

    return this.http.post<Appointement>(this.baseUrl,
      {
        date: new Date(body.date),
        veterinary: body.veterinary,
        appointmentType: body.appointmentType,
        healthRecord: body.healthRecord
      }, {headers: header})
  }

  putAppointment(date: Date, id: string): Observable<Appointement>{
    let header = this.authService.getAuthorizationHeadersWithToken()

    return this.http.put<Appointement>(this.baseUrl+"/"+id,
      {
        date: date,
      }, {headers: header})
  }

  getVetDisponibility(id: string, date: Date): Observable<any>{
    let header = this.authService.getAuthorizationHeadersWithToken()

    return this.http.post<Appointement>(this.baseUrl+"/vet-disponibility/"+id,
      {
        date: date
      }, {headers: header})
  }


  adminGetAppointmentByUserId(userId: string): Observable<Appointement[]>{
    let header = this.authService.getAuthorizationHeadersWithToken()
    return this.http.get<Appointement[]>(this.baseUrl+"/user/"+userId, {headers: header})
  }

  getAppointmentWithFilter(spec: string, date: string, city: string, postalCode: string): Observable<any>{
    let header = this.authService.getAuthorizationHeadersWithToken()

    return this.http.post<Appointement>(this.baseUrl+"/disponibility",
      {
        filter: {
          city: city,
          postalCode: postalCode!==null?postalCode:null,
          speciality: spec,
          date: date,
        }
      }, {headers: header})
  }

}
